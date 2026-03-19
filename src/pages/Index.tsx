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
    const timer = setTimeout(() => setLoading(false), 2800);
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
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: "hsl(0 0% 3%)" }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <div className="font-sanskrit text-7xl text-gold animate-divine-pulse mb-6">ॐ</div>
              <div className="font-divine text-gold/60 text-sm tracking-[0.4em] uppercase">
                Loading the Universe...
              </div>
              {/* Loading bar */}
              <div className="mt-8 w-48 h-px bg-gold/20 mx-auto overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, hsl(43 96% 56%), hsl(28 100% 55%))" }}
                />
              </div>
              {/* Sanskrit verses */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-sanskrit text-saffron/40 text-xs mt-4"
              >
                सर्वे भवन्तु सुखिनः
              </motion.p>
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
              {/* Subtle repeating Sanskrit border decorations */}
              <div className="fixed left-4 top-1/2 -translate-y-1/2 z-[5] hidden xl:flex flex-col gap-6 pointer-events-none">
                {["ॐ", "✦", "☸", "✦", "ॐ"].map((s, i) => (
                  <span key={i} className="font-sanskrit text-gold/10 text-xs">{s}</span>
                ))}
              </div>
              <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[5] hidden xl:flex flex-col gap-6 pointer-events-none">
                {["ॐ", "✦", "☸", "✦", "ॐ"].map((s, i) => (
                  <span key={i} className="font-sanskrit text-gold/10 text-xs">{s}</span>
                ))}
              </div>

              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <ExperienceSection />
              <EducationSection />
              <ContactSection />
              <FooterSection />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
