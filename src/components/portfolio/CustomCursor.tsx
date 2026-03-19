import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
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

  return (
    <>
      {/* Main chakra cursor */}
      <motion.div
        className="custom-cursor pointer-events-none fixed z-[9999]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="relative w-8 h-8">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-gold/60 chakra-spin" />
          {/* Inner ring */}
          <div
            className="absolute inset-[4px] rounded-full border border-saffron/80"
            style={{ animation: "chakra-rotate 5s linear infinite reverse" }}
          />
          {/* Center dot */}
          <div className="absolute inset-[10px] rounded-full bg-gold/90 shadow-glow" />
          {/* Cross spokes */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gold/40 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/40 -translate-x-1/2" />
        </div>
      </motion.div>
      {/* Trailing glow */}
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
