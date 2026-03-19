import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { cv } from "@/data/cv";

const mantras = ["ॐ", "नमः", "सत्यम्", "शिवम्", "सुन्दरम्"];
const krishnaMantras = ["ॐ", "कृष्ण", "हरे", "गोविन्द", "माधव"];

/** SVG peacock feather decoration */
function PeacockFeather({
  x, y, len, rot, opacity
}: { x: string; y: string; len: number; rot: number; opacity: number }) {
  const barbCount = 10;
  return (
    <motion.svg
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y, opacity }}
      width={len * 0.7}
      height={len + 10}
      viewBox={`${-len * 0.35} ${-5} ${len * 0.7} ${len + 15}`}
      animate={{ y: [0, -14, 0], rotate: [rot - 3, rot + 3, rot - 3] }}
      transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Stem */}
      <line x1="0" y1={len} x2="0" y2="0" stroke="hsl(140,55%,40%)" strokeWidth="1.5" />
      {/* Barbs */}
      {Array.from({ length: barbCount }).map((_, i) => {
        const t = (i + 1) / (barbCount + 1);
        const py = len * (1 - t);
        const bLen = Math.sin(t * Math.PI) * len * 0.22;
        const col = `hsl(${140 + t * 55},${60 + t * 10}%,${38 + t * 12}%)`;
        return (
          <g key={i}>
            <line x1="0" y1={py} x2={-bLen} y2={py - bLen * 0.35} stroke={col} strokeWidth="0.9" />
            <line x1="0" y1={py} x2={bLen} y2={py - bLen * 0.35} stroke={col} strokeWidth="0.9" />
          </g>
        );
      })}
      {/* Eye */}
      <circle cx="0" cy="0" r={len * 0.12} fill="none" stroke="hsl(43,96%,60%)" strokeWidth="1.2" />
      <circle cx="0" cy="0" r={len * 0.07} fill="hsl(220,85%,55%)" />
      <circle cx="0" cy="0" r={len * 0.025} fill="hsl(193,90%,75%)" />
      {/* Outer eye glow */}
      <circle cx="0" cy="0" r={len * 0.17} fill="none" stroke="hsl(193,80%,50%)" strokeWidth="0.7" opacity="0.5" />
    </motion.svg>
  );
}

const featherDefs = [
  { x: "4%",  y: "8%",   len: 90,  rot: 12,  opacity: 0.65 },
  { x: "88%", y: "5%",   len: 110, rot: -10, opacity: 0.70 },
  { x: "1%",  y: "45%",  len: 75,  rot: 18,  opacity: 0.50 },
  { x: "92%", y: "40%",  len: 85,  rot: -15, opacity: 0.55 },
  { x: "8%",  y: "78%",  len: 100, rot: 8,   opacity: 0.60 },
  { x: "85%", y: "72%",  len: 95,  rot: -8,  opacity: 0.62 },
  { x: "45%", y: "3%",   len: 70,  rot: 2,   opacity: 0.45 },
  { x: "55%", y: "90%",  len: 80,  rot: -5,  opacity: 0.48 },
  { x: "25%", y: "12%",  len: 65,  rot: 20,  opacity: 0.38 },
  { x: "70%", y: "88%",  len: 72,  rot: -18, opacity: 0.40 },
  { x: "18%", y: "88%",  len: 60,  rot: 14,  opacity: 0.35 },
  { x: "78%", y: "18%",  len: 68,  rot: -12, opacity: 0.42 },
];

interface HeroSectionProps {
  isKrishnaMode?: boolean;
}

export default function HeroSection({ isKrishnaMode = false }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

  const activeMan = isKrishnaMode ? krishnaMantras : mantras;

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
        <img
          src={heroBg}
          alt="Divine Temple"
          className="w-full h-full object-cover object-center"
          style={{
            filter: isKrishnaMode
              ? "brightness(0.72) saturate(1.1) hue-rotate(180deg)"
              : "brightness(0.55) saturate(1.3)",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        {/* Krishna mode: extra blue/peacock overlay */}
        {isKrishnaMode && (
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(160deg, hsl(220 85% 42% / 0.18), hsl(193 90% 38% / 0.12), transparent 60%)" }}
          />
        )}
      </motion.div>

      {/* Ornamental lines */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: isKrishnaMode
            ? "linear-gradient(to right, transparent, hsl(220 85% 55% / 0.6), transparent)"
            : "linear-gradient(to right, transparent, hsl(43 96% 56% / 0.5), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: isKrishnaMode
            ? "linear-gradient(to right, transparent, hsl(193 90% 50% / 0.4), transparent)"
            : "linear-gradient(to right, transparent, hsl(43 96% 56% / 0.3), transparent)",
        }}
      />

      {/* Corner ornaments */}
      {[
        "top-8 left-8",
        "top-8 right-8 rotate-90",
        "bottom-8 left-8 -rotate-90",
        "bottom-8 right-8 rotate-180",
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-16 h-16 opacity-40`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <path
              d="M0 0 L20 0 L20 2 L2 2 L2 20 L0 20 Z"
              fill={isKrishnaMode ? "hsl(220 85% 55%)" : "hsl(43 96% 56%)"}
            />
            <circle cx="5" cy="5" r="2" fill={isKrishnaMode ? "hsl(193 90% 55%)" : "hsl(28 100% 55%)"} />
          </svg>
        </div>
      ))}

      {/* Krishna mode: floating peacock feathers */}
      {isKrishnaMode && (
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          {featherDefs.map((f, i) => (
            <PeacockFeather key={i} {...f} />
          ))}
        </div>
      )}

      {/* Floating mantras */}
      <div className="absolute inset-0 z-[3] overflow-hidden">
        {activeMan.map((m, i) => (
          <motion.div
            key={`${isKrishnaMode}-${i}`}
            className="absolute font-sanskrit select-none pointer-events-none"
            style={{
              left: `${15 + i * 18}%`,
              top: `${10 + (i % 3) * 25}%`,
              fontSize: `${2 + i * 0.5}rem`,
              color: isKrishnaMode
                ? `hsl(220 85% 55% / 0.15)`
                : `hsl(43 96% 56% / 0.10)`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.08, 0.22, 0.08],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          >
            {m}
          </motion.div>
        ))}
      </div>

      {/* Krishna: spinning Sudarshan Chakra watermark */}
      {isKrishnaMode && (
        <motion.div
          className="absolute z-[2] opacity-[0.06] pointer-events-none"
          style={{ right: "8%", top: "15%" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200">
            {Array.from({ length: 24 }).map((_, i) => {
              const ang = (i * 360) / 24;
              const rad = (ang * Math.PI) / 180;
              const x1 = 100 + Math.cos(rad) * 60;
              const y1 = 100 + Math.sin(rad) * 60;
              const x2 = 100 + Math.cos(rad) * 90;
              const y2 = 100 + Math.sin(rad) * 90;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(220,85%,50%)" strokeWidth="4" strokeLinecap="round" />;
            })}
            <circle cx="100" cy="100" r="58" fill="none" stroke="hsl(220,85%,50%)" strokeWidth="3" />
            <circle cx="100" cy="100" r="35" fill="none" stroke="hsl(193,90%,50%)" strokeWidth="2" />
            <circle cx="100" cy="100" r="14" fill="hsl(220,85%,55%)" />
            <circle cx="100" cy="100" r="6" fill="hsl(48,100%,65%)" />
          </svg>
        </motion.div>
      )}

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity }}
      >
        {/* Sanskrit subtitle */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.25em" }}
          transition={{ duration: 2, delay: 0.3 }}
          className="font-sanskrit text-sm md:text-base mb-6 tracking-[0.25em]"
          style={{ color: isKrishnaMode ? "hsl(220 85% 45% / 0.85)" : undefined }}
        >
          {isKrishnaMode
            ? "✦ श्री कृष्णाय नमः ✦ हरे कृष्ण ✦"
            : "✦ स्वागतम् ✦ श्री गणेशाय नमः ✦"}
        </motion.p>

        {/* Main tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-epic text-muted-foreground text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
        >
          Welcome to my Digital Universe
        </motion.p>

        {/* Name */}
        <div className="relative mb-8">
          <div
            className="absolute inset-0 blur-3xl opacity-30"
            style={{
              background: isKrishnaMode
                ? "radial-gradient(ellipse, hsl(220 85% 55%), transparent 70%)"
                : "radial-gradient(ellipse, hsl(43 96% 56%), transparent 70%)",
            }}
          />
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.08em" }}
            transition={{ duration: 2.5, delay: 1.2, ease: "easeOut" }}
            className="font-divine text-5xl md:text-7xl lg:text-8xl section-heading relative"
          >
            {cv.personal.name}
          </motion.h1>
        </div>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div
            className="h-px w-16"
            style={{
              background: isKrishnaMode
                ? "linear-gradient(to right, transparent, hsl(220 85% 55% / 0.7))"
                : "linear-gradient(to right, transparent, hsl(43 96% 56% / 0.6))",
            }}
          />
          <p
            className="font-epic text-base md:text-xl tracking-[0.2em]"
            style={{ color: isKrishnaMode ? "hsl(220 85% 45% / 0.85)" : "hsl(43 96% 56% / 0.8)" }}
          >
            {cv.personal.title}
          </p>
          <div
            className="h-px w-16"
            style={{
              background: isKrishnaMode
                ? "linear-gradient(to left, transparent, hsl(220 85% 55% / 0.7))"
                : "linear-gradient(to left, transparent, hsl(43 96% 56% / 0.6))",
            }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.3 }}
          className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {cv.personal.summary}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="relative group px-8 py-3 font-epic text-sm tracking-widest uppercase overflow-hidden"
            style={{
              background: isKrishnaMode
                ? "linear-gradient(135deg, hsl(220 85% 30%), hsl(220 85% 45%), hsl(193 90% 38%))"
                : "linear-gradient(135deg, hsl(43 96% 35%), hsl(43 96% 56%), hsl(43 96% 35%))",
              backgroundSize: "200% auto",
              color: isKrishnaMode ? "hsl(45 100% 95%)" : "hsl(0 0% 5%)",
              border: isKrishnaMode ? "1px solid hsl(220 85% 60%)" : "1px solid hsl(43 96% 60%)",
              boxShadow: isKrishnaMode
                ? "0 0 20px hsl(220 85% 45% / 0.4)"
                : "0 0 20px hsl(43 96% 56% / 0.3)",
            }}
          >
            <span className="relative z-10">View My Epics</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: isKrishnaMode ? "hsl(193 90% 50% / 0.2)" : "hsl(28 100% 55% / 0.2)" }}
            />
          </a>
          <a
            href="#contact"
            className="px-8 py-3 font-epic text-sm tracking-widest uppercase transition-all duration-300"
            style={{
              color: isKrishnaMode ? "hsl(220 85% 45%)" : "hsl(43 96% 56%)",
              border: isKrishnaMode ? "1px solid hsl(220 85% 55% / 0.45)" : "1px solid hsl(43 96% 56% / 0.4)",
            }}
          >
            {isKrishnaMode ? "कृष्ण Connection" : "Divine Connection"}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="font-sanskrit text-xs"
            style={{ color: isKrishnaMode ? "hsl(220 85% 50% / 0.5)" : "hsl(43 96% 56% / 0.4)" }}
          >
            नीचे
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
            style={{ border: isKrishnaMode ? "1px solid hsl(220 85% 55% / 0.35)" : "1px solid hsl(43 96% 56% / 0.3)" }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{ background: isKrishnaMode ? "hsl(220 85% 55% / 0.7)" : "hsl(43 96% 56% / 0.6)" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
