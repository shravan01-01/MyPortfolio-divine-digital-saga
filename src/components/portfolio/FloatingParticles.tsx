import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  type: "spark" | "feather";
  rotation: number;
  rotationSpeed: number;
  featherLength: number;
}

interface FloatingParticlesProps {
  count?: number;
  isKrishnaMode?: boolean;
}

export default function FloatingParticles({
  count = 60,
  isKrishnaMode = false,
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const krishnaRef = useRef(isKrishnaMode);

  useEffect(() => {
    krishnaRef.current = isKrishnaMode;
  }, [isKrishnaMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const featherCount = Math.floor(count * 0.5);
    const sparkCount = count - featherCount;

    const particles: Particle[] = [
      // Sparks
      ...Array.from({ length: sparkCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.2,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.2,
        hue: Math.random() > 0.6 ? 43 : Math.random() > 0.5 ? 28 : 0,
        type: "spark" as const,
        rotation: 0,
        rotationSpeed: 0,
        featherLength: 0,
      })),
      // Peacock feathers — more of them, spread across whole viewport
      ...Array.from({ length: featherCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -Math.random() * 0.25 - 0.04,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.65 + 0.25,
        hue: 0,
        type: "feather" as const,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        featherLength: Math.random() * 34 + 22,
      })),
    ];

    /** Teal peacock feather */
    function drawFeather(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      len: number,
      rotation: number,
      opacity: number,
      isKrishna: boolean
    ) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      // Stem gradient — teal in Krishna mode
      const stemGrad = ctx.createLinearGradient(0, 0, 0, -len);
      stemGrad.addColorStop(0, isKrishna ? "hsl(160,60%,38%)" : "hsl(43,96%,56%)");
      stemGrad.addColorStop(0.5, isKrishna ? "hsl(185,72%,42%)" : "hsl(140,55%,45%)");
      stemGrad.addColorStop(1, isKrishna ? "hsl(43,90%,52%)" : "hsl(193,90%,55%)");
      ctx.strokeStyle = stemGrad;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -len);
      ctx.stroke();

      // Barbs
      const barbCount = Math.floor(len / 3);
      for (let i = 1; i < barbCount; i++) {
        const t = i / barbCount;
        const py = -len * t;
        const barbLen = (Math.sin(t * Math.PI) * len) / 4.5;
        const alpha = opacity * (0.4 + t * 0.5);
        const hue = isKrishna ? 160 + t * 28 : 140 + t * 50;
        const sat = isKrishna ? 65 + t * 10 : 60;
        const lit = isKrishna ? 38 + t * 14 : 45 + t * 10;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = `hsl(${hue},${sat}%,${lit}%)`;
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(-barbLen, py - barbLen * 0.32);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(barbLen, py - barbLen * 0.32);
        ctx.stroke();
        ctx.restore();
      }

      // Eye at tip
      const tipY = -len;
      const eyeR = len / 7;

      // Outer halo — teal glow in Krishna mode
      const eyeGrad = ctx.createRadialGradient(0, tipY, 0, 0, tipY, eyeR * 2.8);
      eyeGrad.addColorStop(0, isKrishna ? "hsla(43,90%,62%,0.9)" : "hsla(270,70%,55%,0.9)");
      eyeGrad.addColorStop(0.35, isKrishna ? "hsla(185,72%,45%,0.75)" : "hsla(193,90%,45%,0.7)");
      eyeGrad.addColorStop(0.65, isKrishna ? "hsla(160,60%,38%,0.45)" : "hsla(140,60%,40%,0.4)");
      eyeGrad.addColorStop(1, "hsla(43,96%,56%,0)");
      ctx.fillStyle = eyeGrad;
      ctx.beginPath();
      ctx.arc(0, tipY, eyeR * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Inner iris
      ctx.fillStyle = isKrishna ? "hsl(185,75%,38%)" : "hsl(43,96%,70%)";
      ctx.beginPath();
      ctx.arc(0, tipY, eyeR * 0.65, 0, Math.PI * 2);
      ctx.fill();

      // Pupil
      ctx.fillStyle = isKrishna ? "hsl(43,90%,65%)" : "hsl(185,90%,72%)";
      ctx.beginPath();
      ctx.arc(0, tipY, eyeR * 0.28, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    const draw = () => {
      const isKrishna = krishnaRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        if (p.type === "spark") {
          // Teal sparks for Krishna mode
          const hue = isKrishna
            ? (Math.random() > 0.5 ? 185 : 160)
            : p.hue;
          const sat = isKrishna ? 72 : 96;
          const lit = isKrishna ? 48 : 60;
          const flicker = Math.sin(Date.now() * 0.002 + p.x) * 0.2 + 0.8;
          ctx.beginPath();
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          grad.addColorStop(0, `hsla(${hue}, ${sat}%, ${lit}%, ${p.opacity * flicker})`);
          grad.addColorStop(1, `hsla(${hue}, ${sat}%, ${lit}%, 0)`);
          ctx.fillStyle = grad;
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          p.rotation += p.rotationSpeed;
          const featherOpacity = isKrishna ? p.opacity : p.opacity * 0.15;
          if (featherOpacity > 0.02) {
            drawFeather(ctx, p.x, p.y, p.featherLength, p.rotation, featherOpacity, isKrishna);
          }
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ mixBlendMode: isKrishnaMode ? "normal" : "screen" }}
    />
  );
}
