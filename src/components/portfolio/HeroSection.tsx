import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import profilePicFallback from "@/assets/krishna-ref.jpg";
import { cv } from "@/data/cv";

// Primary from public folder, fallback to local bundler asset
const profilePicPublic = "/Shravan.jpeg";

const mantras = ["ॐ", "नमः", "सत्यम्", "शिवम्", "सुन्दरम्"];
const krishnaMantras = ["ॐ", "कृष्ण", "हरे", "गोविन्द", "माधव"];

// ── Peacock Feather SVG (more barbs, larger eye, richer colours) ──────────
function PeacockFeather({
  x, y, len, rot, opacity
}: { x: string; y: string; len: number; rot: number; opacity: number }) {
  const barbCount = 14;
  return (
    <motion.svg
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y, opacity }}
      width={len * 0.8}
      height={len + 20}
      viewBox={`${-len * 0.4} ${-8} ${len * 0.8} ${len + 24}`}
      animate={{ y: [0, -16, 0], rotate: [rot - 4, rot + 4, rot - 4] }}
      transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Stem with gradient */}
      <defs>
        <linearGradient id={`stem-${len}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="hsl(160,60%,38%)" />
          <stop offset="50%" stopColor="hsl(185,72%,38%)" />
          <stop offset="100%" stopColor="hsl(43,90%,52%)" />
        </linearGradient>
        <radialGradient id={`eye-${len}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(43,90%,70%)" />
          <stop offset="35%" stopColor="hsl(185,80%,40%)" />
          <stop offset="65%" stopColor="hsl(160,60%,30%)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <line x1="0" y1={len} x2="0" y2="0" stroke={`url(#stem-${len})`} strokeWidth="1.8" />
      {/* Barbs */}
      {Array.from({ length: barbCount }).map((_, i) => {
        const t = (i + 1) / (barbCount + 1);
        const py = len * (1 - t);
        const bLen = Math.sin(t * Math.PI) * len * 0.28;
        const hue = 160 + t * 30;
        const sat = 60 + t * 10;
        const lit = 35 + t * 15;
        const col = `hsl(${hue},${sat}%,${lit}%)`;
        return (
          <g key={i}>
            <line x1="0" y1={py} x2={-bLen} y2={py - bLen * 0.32} stroke={col} strokeWidth="0.85" />
            <line x1="0" y1={py} x2={bLen} y2={py - bLen * 0.32} stroke={col} strokeWidth="0.85" />
          </g>
        );
      })}
      {/* Eye outer halo */}
      <circle cx="0" cy="0" r={len * 0.22} fill={`url(#eye-${len})`} opacity="0.7" />
      {/* Eye ring */}
      <circle cx="0" cy="0" r={len * 0.14} fill="none" stroke="hsl(43,90%,60%)" strokeWidth="1.4" />
      {/* Inner iris */}
      <circle cx="0" cy="0" r={len * 0.09} fill="hsl(185,80%,35%)" />
      {/* Pupil */}
      <circle cx="0" cy="0" r={len * 0.04} fill="hsl(185,90%,72%)" />
      {/* Outer shimmer ring */}
      <circle cx="0" cy="0" r={len * 0.18} fill="none" stroke="hsl(185,72%,55%)" strokeWidth="0.8" opacity="0.55" />
    </motion.svg>
  );
}

// More feathers, spread across the whole page
const featherDefs = [
  { x: "2%",  y: "5%",   len: 110, rot: 14,  opacity: 0.75 },
  { x: "86%", y: "3%",   len: 130, rot: -12, opacity: 0.80 },
  { x: "0%",  y: "40%",  len: 90,  rot: 20,  opacity: 0.60 },
  { x: "90%", y: "35%",  len: 100, rot: -18, opacity: 0.65 },
  { x: "5%",  y: "72%",  len: 120, rot: 10,  opacity: 0.70 },
  { x: "83%", y: "68%",  len: 115, rot: -10, opacity: 0.72 },
  { x: "42%", y: "1%",   len: 80,  rot: 3,   opacity: 0.55 },
  { x: "53%", y: "88%",  len: 95,  rot: -6,  opacity: 0.58 },
  { x: "22%", y: "10%",  len: 75,  rot: 22,  opacity: 0.48 },
  { x: "68%", y: "85%",  len: 88,  rot: -20, opacity: 0.50 },
  { x: "15%", y: "85%",  len: 72,  rot: 16,  opacity: 0.45 },
  { x: "76%", y: "15%",  len: 82,  rot: -14, opacity: 0.52 },
  { x: "30%", y: "55%",  len: 65,  rot: 8,   opacity: 0.38 },
  { x: "62%", y: "48%",  len: 70,  rot: -9,  opacity: 0.40 },
  { x: "48%", y: "30%",  len: 60,  rot: 5,   opacity: 0.35 },
  { x: "10%", y: "22%",  len: 68,  rot: 18,  opacity: 0.42 },
];

interface HeroSectionProps {
  isKrishnaMode?: boolean;
}

export default function HeroSection({ isKrishnaMode = false }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [profileImageSrc, setProfileImageSrc] = useState(profilePicPublic);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

  const activeMan = isKrishnaMode ? krishnaMantras : mantras;

  // Teal palette constants for Krishna mode
  const teal = "hsl(185 72% 32%)";
  const tealBright = "hsl(185 72% 45%)";
  const tealGlow = "hsl(185 80% 55%)";
  const gold = "hsl(43 90% 48%)";

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
        {isKrishnaMode ? (
          /* Krishna mode: beautiful white + peacock teal gradient — no dark image */
          <>
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(160deg, hsl(196 90% 28% / 0.12) 0%, hsl(0 0% 100%) 35%, hsl(194 50% 97%) 65%, hsl(130 32% 95%) 100%)",
              }}
            />
            {/* Radial peacock glow top-left */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 70% 60% at 15% 20%, hsl(196 90% 28% / 0.14), transparent 70%)",
              }}
            />
            {/* Subtle gold shimmer bottom */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 50% 40% at 85% 80%, hsl(43 90% 48% / 0.10), transparent 70%)",
              }}
            />
            {/* Soft forest green accent right */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 40% 50% at 90% 30%, hsl(130 32% 22% / 0.08), transparent 70%)",
              }}
            />
          </>
        ) : (
          <>
            <img
              src={heroBg}
              alt="Divine Temple"
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.55) saturate(1.3)" }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
          </>
        )}
      </motion.div>

      {/* Ornamental lines */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: isKrishnaMode
            ? `linear-gradient(to right, transparent, ${tealBright} / 0.6, transparent)`
            : "linear-gradient(to right, transparent, hsl(43 96% 56% / 0.5), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: isKrishnaMode
            ? `linear-gradient(to right, transparent, ${tealGlow} / 0.4, transparent)`
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
        <div key={i} className={`absolute ${pos} w-16 h-16 opacity-50`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <path
              d="M0 0 L20 0 L20 2 L2 2 L2 20 L0 20 Z"
              fill={isKrishnaMode ? tealBright : "hsl(43 96% 56%)"}
            />
            <circle cx="5" cy="5" r="2" fill={isKrishnaMode ? gold : "hsl(28 100% 55%)"} />
          </svg>
        </div>
      ))}

      {/* Krishna mode: abundant floating peacock feathers across full section */}
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
                ? `hsl(185 72% 38% / 0.18)`
                : `hsl(43 96% 56% / 0.10)`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.08, 0.25, 0.08] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
          >
            {m}
          </motion.div>
        ))}
      </div>

      {/* Krishna: spinning Sudarshan Chakra watermark — larger and more prominent */}
      {isKrishnaMode && (
        <motion.div
          className="absolute z-[2] pointer-events-none"
          style={{ right: "6%", top: "12%", opacity: 0.12 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <svg width="240" height="240" viewBox="0 0 240 240">
            {/* Outer serrated spokes */}
            {Array.from({ length: 32 }).map((_, i) => {
              const ang = (i * 360) / 32;
              const rad = (ang * Math.PI) / 180;
              const x1 = 120 + Math.cos(rad) * 75;
              const y1 = 120 + Math.sin(rad) * 75;
              const x2 = 120 + Math.cos(rad) * 108;
              const y2 = 120 + Math.sin(rad) * 108;
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="hsl(185,72%,45%)" strokeWidth="3.5" strokeLinecap="round" />
              );
            })}
            {/* Mid spokes */}
            {Array.from({ length: 16 }).map((_, i) => {
              const ang = (i * 360) / 16 + 11.25;
              const rad = (ang * Math.PI) / 180;
              const x1 = 120 + Math.cos(rad) * 55;
              const y1 = 120 + Math.sin(rad) * 55;
              const x2 = 120 + Math.cos(rad) * 75;
              const y2 = 120 + Math.sin(rad) * 75;
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="hsl(43,90%,55%)" strokeWidth="2" strokeLinecap="round" />
              );
            })}
            <circle cx="120" cy="120" r="110" fill="none" stroke="hsl(185,72%,45%)" strokeWidth="2.5" />
            <circle cx="120" cy="120" r="73" fill="none" stroke="hsl(185,80%,52%)" strokeWidth="2" />
            <circle cx="120" cy="120" r="53" fill="none" stroke="hsl(43,90%,55%)" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="20" fill="hsl(185,72%,45%)" />
            <circle cx="120" cy="120" r="9" fill="hsl(43,90%,62%)" />
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
          style={{ color: isKrishnaMode ? `${teal}` : undefined }}
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

        {/* Name + profile picture */}
        <div className="flex flex-col items-center mb-8 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
            className="relative w-28 h-28 md:w-32 md:h-32"
          >
            {/* Ambient halo behind the avatar */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-30"
              style={{
                background: isKrishnaMode
                  ? `radial-gradient(ellipse, ${tealBright}, transparent 70%)`
                  : "radial-gradient(ellipse, hsl(43 96% 56%), transparent 70%)",
              }}
            />

            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: isKrishnaMode
                  ? `0 0 28px hsl(185 72% 42% / 0.35), 0 0 60px hsl(43 90% 46% / 0.15)`
                  : `0 0 28px hsl(43 96% 56% / 0.30), 0 0 60px hsl(28 100% 55% / 0.12)`,
                border: `1px solid ${isKrishnaMode ? "hsl(185 72% 45% / 0.55)" : "hsl(43 96% 60% / 0.45)"}`,
              }}
            />

            <img
              src={profileImageSrc}
              alt="Profile picture"
              className="absolute inset-2 rounded-full object-cover ring-1"
              onError={(event) => {
                if (event.currentTarget.src !== profilePicFallback) {
                  setProfileImageSrc(profilePicFallback);
                }
              }}
              style={{
                ringColor: isKrishnaMode ? "hsl(185 72% 45% / 0.65)" : "hsl(43 96% 60% / 0.55)",
              }}
            />
          </motion.div>

          {/* Name */}
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.08em" }}
              transition={{ duration: 2.5, delay: 1.2, ease: "easeOut" }}
              className="font-divine text-5xl md:text-7xl lg:text-8xl section-heading relative"
            >
              {cv.personal.name}
            </motion.h1>
          </div>
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
                ? `linear-gradient(to right, transparent, ${tealBright})`
                : "linear-gradient(to right, transparent, hsl(43 96% 56% / 0.6))",
            }}
          />
          <p
            className="font-epic text-base md:text-xl tracking-[0.2em]"
            style={{ color: isKrishnaMode ? teal : "hsl(43 96% 56% / 0.8)" }}
          >
            {cv.personal.title}
          </p>
          <div
            className="h-px w-16"
            style={{
              background: isKrishnaMode
                ? `linear-gradient(to left, transparent, ${tealBright})`
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
                ? `linear-gradient(135deg, hsl(185 72% 22%), hsl(185 72% 35%), hsl(160 60% 30%))`
                : "linear-gradient(135deg, hsl(43 96% 35%), hsl(43 96% 56%), hsl(43 96% 35%))",
              backgroundSize: "200% auto",
              color: isKrishnaMode ? "hsl(45 100% 95%)" : "hsl(0 0% 5%)",
              border: isKrishnaMode ? `1px solid ${tealBright}` : "1px solid hsl(43 96% 60%)",
              boxShadow: isKrishnaMode
                ? `0 0 20px hsl(185 72% 38% / 0.45)`
                : "0 0 20px hsl(43 96% 56% / 0.3)",
            }}
          >
            <span className="relative z-10">View My Epics</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: isKrishnaMode ? "hsl(160 60% 40% / 0.25)" : "hsl(28 100% 55% / 0.2)" }}
            />
          </a>
          <a
            href="#contact"
            className="px-8 py-3 font-epic text-sm tracking-widest uppercase transition-all duration-300"
            style={{
              color: isKrishnaMode ? teal : "hsl(43 96% 56%)",
              border: isKrishnaMode
                ? `1px solid hsl(185 72% 45% / 0.5)`
                : "1px solid hsl(43 96% 56% / 0.4)",
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
            style={{ color: isKrishnaMode ? `hsl(185 72% 42% / 0.6)` : "hsl(43 96% 56% / 0.4)" }}
          >
            नीचे
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
            style={{
              border: isKrishnaMode
                ? `1px solid hsl(185 72% 50% / 0.40)`
                : "1px solid hsl(43 96% 56% / 0.3)",
            }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{
                background: isKrishnaMode
                  ? `hsl(185 72% 55% / 0.75)`
                  : "hsl(43 96% 56% / 0.6)",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
