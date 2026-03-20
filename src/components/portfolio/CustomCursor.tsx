import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CustomCursorProps {
  isKrishnaMode?: boolean;
}

export default function CustomCursor({ isKrishnaMode = false }: CustomCursorProps) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useSpring(cursorX, { stiffness: 120, damping: 18 });
  const trailY = useSpring(cursorY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  if (isKrishnaMode) {
    // Krishna Sudarshan Chakra cursor — teal peacock palette
    return (
      <>
        {/* Main Sudarshan Chakra */}
        <motion.div
          className="custom-cursor pointer-events-none fixed z-[9999]"
          style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        >
          <div className="relative w-10 h-10">
            {/* Outer serrated spinning ring — teal */}
            <motion.svg
              width="40" height="40" viewBox="0 0 40 40"
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i * 360) / 16;
                const rad = (angle * Math.PI) / 180;
                const x1 = 20 + Math.cos(rad) * 14;
                const y1 = 20 + Math.sin(rad) * 14;
                const x2 = 20 + Math.cos(rad) * 19;
                const y2 = 20 + Math.sin(rad) * 19;
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="hsl(185,72%,38%)" strokeWidth="2.5" strokeLinecap="round" />
                );
              })}
              <circle cx="20" cy="20" r="13" fill="none" stroke="hsl(185,72%,45%)" strokeWidth="1.5" opacity="0.85"/>
            </motion.svg>

            {/* Inner ring spinning reverse — gold */}
            <motion.svg
              width="40" height="40" viewBox="0 0 40 40"
              className="absolute inset-0"
              animate={{ rotate: -360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 360) / 8;
                const rad = (angle * Math.PI) / 180;
                const x1 = 20 + Math.cos(rad) * 8;
                const y1 = 20 + Math.sin(rad) * 8;
                const x2 = 20 + Math.cos(rad) * 11;
                const y2 = 20 + Math.sin(rad) * 11;
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="hsl(43,90%,52%)" strokeWidth="2" strokeLinecap="round" />
                );
              })}
              <circle cx="20" cy="20" r="7.5" fill="none" stroke="hsl(160,60%,42%)" strokeWidth="1" opacity="0.9"/>
            </motion.svg>

            {/* Center dot — teal-gold */}
            <div
              className="absolute"
              style={{
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: 8, height: 8,
                borderRadius: "50%",
                background: "radial-gradient(circle, hsl(43,90%,80%), hsl(185,72%,42%))",
                boxShadow: "0 0 10px hsl(185 72% 45% / 0.9), 0 0 20px hsl(160 60% 40% / 0.6)",
              }}
            />
          </div>
        </motion.div>

        {/* Trailing teal glow */}
        <motion.div
          className="custom-cursor pointer-events-none fixed z-[9998]"
          style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
        >
          <div
            className="w-20 h-20 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, hsl(185 72% 45%), hsl(160 60% 38% / 0.5), transparent 70%)" }}
          />
        </motion.div>
      </>
    );
  }

  // Default night — Mahabharata chakra cursor
  return (
    <>
      <motion.div
        className="custom-cursor pointer-events-none fixed z-[9999]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full border-2 border-gold/60 chakra-spin" />
          <div
            className="absolute inset-[4px] rounded-full border border-saffron/80"
            style={{ animation: "chakra-rotate 5s linear infinite reverse" }}
          />
          <div className="absolute inset-[10px] rounded-full bg-gold/90 shadow-glow" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gold/40 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/40 -translate-x-1/2" />
        </div>
      </motion.div>
      <motion.div
        className="custom-cursor pointer-events-none fixed z-[9998]"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          className="w-16 h-16 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(43 96% 56%), transparent 70%)" }}
        />
      </motion.div>
    </>
  );
}
