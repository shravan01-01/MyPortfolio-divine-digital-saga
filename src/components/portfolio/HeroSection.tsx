import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import profilePicFallback from "@/assets/Shravan.jpeg";
import { cv } from "@/data/cv";

// Primary from public folder, fallback to local bundler asset
const profilePicPublic = "/Shravan.jpeg";

interface HeroSectionProps {
  isKrishnaMode?: boolean;
}

export default function HeroSection({ isKrishnaMode = false }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img
          src={heroBg}
          alt="Divine Temple"
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.4) saturate(1.2)" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </motion.div>

      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-gold/20 text-6xl font-sanskrit">ॐ</div>
        <div className="absolute bottom-20 right-10 text-gold/20 text-4xl font-sanskrit">✦</div>
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{ opacity }}
      >
        {/* Sanskrit greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sanskrit text-gold/80 text-lg mb-6 tracking-wider"
        >
          नमस्ते
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-divine text-5xl md:text-7xl lg:text-8xl text-foreground mb-6"
        >
          {cv.personal.name}
        </motion.h1>

        {/* Profile picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-32 h-32 md:w-36 md:h-36 mx-auto mb-8"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-saffron/20 blur-xl" />
          <img
            src={profilePicPublic}
            alt="Profile picture"
            className="relative w-full h-full rounded-full object-cover border-2 border-gold/30"
            onError={(event) => {
              event.currentTarget.src = profilePicFallback;
            }}
          />
        </motion.div>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-epic text-xl md:text-2xl text-gold mb-6 tracking-wide"
        >
          {cv.personal.title}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          {cv.personal.summary}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <a
            href="#projects"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold to-saffron text-background font-epic text-sm tracking-wider uppercase rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 border-2 border-gold/50 text-gold font-epic text-sm tracking-wider uppercase rounded-lg hover:bg-gold/10 transition-all duration-300"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gold rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
