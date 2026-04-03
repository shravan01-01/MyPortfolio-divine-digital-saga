import { useState, useEffect } from "react";
import CustomCursor from "@/components/portfolio/CustomCursor";
import FloatingParticles from "@/components/portfolio/FloatingParticles";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import EducationSection from "@/components/portfolio/EducationSection";
import ContactSection from "@/components/portfolio/ContactSection";
import FooterSection from "@/components/portfolio/FooterSection";
import { motion, AnimatePresence } from "framer-motion";

export default function Index() {
  const [isDayMode, setIsDayMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Reduced from 2800ms
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={isDayMode ? "light-divine" : ""}>
      {/* Custom cursor */}
      <CustomCursor isKrishnaMode={isDayMode} />

      {/* Ambient floating particles */}
      <FloatingParticles count={50} isKrishnaMode={isDayMode} />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="font-sanskrit text-6xl text-gold mb-6">ॐ</div>
              <div className="font-epic text-gold/60 text-sm tracking-widest uppercase">
                Loading...
              </div>
              <div className="mt-8 w-32 h-1 bg-gold/20 mx-auto overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-gold to-saffron rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar isDayMode={isDayMode} onToggleMode={() => setIsDayMode(!isDayMode)} />

            <main className="relative">
              <HeroSection isKrishnaMode={isDayMode} />
              <AboutSection isKrishnaMode={isDayMode} />
              <SkillsSection isKrishnaMode={isDayMode} />
              <ProjectsSection isKrishnaMode={isDayMode} />
              <ExperienceSection isKrishnaMode={isDayMode} />
              <EducationSection />
              <ContactSection isKrishnaMode={isDayMode} />
              <FooterSection />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
