import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { cv } from "@/data/cv";

const mantras = ["ॐ", "नमः", "सत्यम्", "शिवम्", "सुन्दरम्"];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

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
          style={{ filter: "brightness(0.55) saturate(1.3)" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </motion.div>

      {/* Ornamental lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Corner ornaments */}
      {[
        "top-8 left-8",
        "top-8 right-8 rotate-90",
        "bottom-8 left-8 -rotate-90",
        "bottom-8 right-8 rotate-180",
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-16 h-16 opacity-40`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <path d="M0 0 L20 0 L20 2 L2 2 L2 20 L0 20 Z" fill="hsl(43 96% 56%)" />
            <circle cx="5" cy="5" r="2" fill="hsl(28 100% 55%)" />
          </svg>
        </div>
      ))}

      {/* Floating mantras */}
      <div className="absolute inset-0 z-[2] overflow-hidden">
        {mantras.map((m, i) => (
          <motion.div
            key={i}
            className="absolute font-sanskrit text-gold/10 select-none pointer-events-none"
            style={{
              left: `${15 + i * 18}%`,
              top: `${10 + (i % 3) * 25}%`,
              fontSize: `${2 + i * 0.5}rem`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.08, 0.18, 0.08],
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
          className="font-sanskrit text-saffron/80 text-sm md:text-base mb-6 tracking-[0.25em]"
        >
          ✦ स्वागतम् ✦ श्री गणेशाय नमः ✦
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

        {/* Name — Mantra animation */}
        <div className="relative mb-8">
          {/* Glow behind name */}
          <div
            className="absolute inset-0 blur-3xl opacity-30"
            style={{ background: "radial-gradient(ellipse, hsl(43 96% 56%), transparent 70%)" }}
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
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <p className="font-epic text-gold/80 text-base md:text-xl tracking-[0.2em]">
            {cv.personal.title}
          </p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
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
              background: "linear-gradient(135deg, hsl(43 96% 35%), hsl(43 96% 56%), hsl(43 96% 35%))",
              backgroundSize: "200% auto",
              color: "hsl(0 0% 5%)",
              border: "1px solid hsl(43 96% 60%)",
              boxShadow: "0 0 20px hsl(43 96% 56% / 0.3)",
            }}
          >
            <span className="relative z-10">View My Epics</span>
            <div className="absolute inset-0 bg-saffron/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3 font-epic text-sm tracking-widest uppercase text-gold border border-gold/40 
                       hover:border-gold hover:shadow-divine transition-all duration-300"
          >
            Divine Connection
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-sanskrit text-gold/40 text-xs">नीचे</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border border-gold/30 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-gold/60" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
