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

    const featherCount = Math.floor(count * 0.45);
    const sparkCount = count - featherCount;

    const particles: Particle[] = [
      // Sparks (gold/saffron for night, blue/gold for Krishna day)
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
      // Peacock feathers
      ...Array.from({ length: featherCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.3 - 0.05,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.55 + 0.2,
        hue: 0,
        type: "feather" as const,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.012,
        featherLength: Math.random() * 28 + 18,
      })),
    ];

    /** Draw a mini peacock feather at (x,y) with given rotation & length */
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

      // Quill / stem
      const stemGrad = ctx.createLinearGradient(0, 0, 0, -len);
      stemGrad.addColorStop(0, isKrishna ? "hsl(220,85%,42%)" : "hsl(43,96%,56%)");
      stemGrad.addColorStop(0.5, "hsl(140,55%,45%)");
      stemGrad.addColorStop(1, "hsl(193,90%,55%)");
      ctx.strokeStyle = stemGrad;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -len);
      ctx.stroke();

      // Barbs — tiny lines along the stem
      const barbCount = Math.floor(len / 3.5);
      for (let i = 1; i < barbCount; i++) {
        const t = i / barbCount;
        const py = -len * t;
        const barbLen = (Math.sin(t * Math.PI) * len) / 5;
        const alpha = opacity * (0.4 + t * 0.5);

        // Left barb
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = `hsl(${140 + t * 50},65%,${45 + t * 10}%)`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(-barbLen, py - barbLen * 0.35);
        ctx.stroke();

        // Right barb
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(barbLen, py - barbLen * 0.35);
        ctx.stroke();
        ctx.restore();
      }

      // Eye at tip — iridescent circle
      const tipY = -len;
      const eyeR = len / 8;

      // Outer glow ring
      const eyeGrad = ctx.createRadialGradient(0, tipY, 0, 0, tipY, eyeR * 2.5);
      eyeGrad.addColorStop(0, isKrishna ? "hsla(220,90%,55%,0.9)" : "hsla(270,70%,55%,0.9)");
      eyeGrad.addColorStop(0.4, "hsla(193,90%,45%,0.7)");
      eyeGrad.addColorStop(0.7, "hsla(140,60%,40%,0.4)");
      eyeGrad.addColorStop(1, "hsla(43,96%,56%,0)");
      ctx.fillStyle = eyeGrad;
      ctx.beginPath();
      ctx.arc(0, tipY, eyeR * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Inner eye core
      ctx.fillStyle = isKrishna ? "hsl(270,70%,55%)" : "hsl(43,96%,70%)";
      ctx.beginPath();
      ctx.arc(0, tipY, eyeR * 0.6, 0, Math.PI * 2);
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
          const hue = isKrishna
            ? (Math.random() > 0.5 ? 220 : 193) // blue tones
            : p.hue;
          const flicker = Math.sin(Date.now() * 0.002 + p.x) * 0.2 + 0.8;
          ctx.beginPath();
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          grad.addColorStop(0, `hsla(${hue}, 96%, 60%, ${p.opacity * flicker})`);
          grad.addColorStop(1, `hsla(${hue}, 96%, 60%, 0)`);
          ctx.fillStyle = grad;
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Feather — only prominently visible in Krishna mode, subtle otherwise
          p.rotation += p.rotationSpeed;
          const featherOpacity = isKrishna ? p.opacity : p.opacity * 0.18;
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
      style={{ mixBlendMode: "screen" }}
    />
  );
}
