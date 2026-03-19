import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cv } from "@/data/cv";

export default function EducationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 80px, hsl(43 96% 56% / 0.3) 80px, hsl(43 96% 56% / 0.3) 81px)" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-sanskrit text-saffron/70 text-sm tracking-[0.3em] mb-3">शिक्षा यात्रा</p>
          <h2 className="section-heading font-divine text-4xl md:text-5xl mb-4">Education</h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Academic milestones that shaped my skillset and worldview.
          </p>
          <div className="divider-ornate max-w-xs mx-auto mt-6">
            <span className="font-sanskrit text-gold/60 text-xl">✦</span>
          </div>
        </motion.div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {cv.education.map((edu) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="scroll-card p-6"
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <h3 className="font-epic text-gold text-xl">{edu.degree}</h3>
                <span className="font-sanskrit text-saffron/60 text-xs">{edu.period}</span>
              </div>
              <p className="font-body text-muted-foreground mb-2">{edu.institution}</p>
              {edu.gpa && <p className="font-body text-saffron text-sm">GPA: {edu.gpa}</p>}
              {edu.percent && <p className="font-body text-saffron text-sm">Percentage: {edu.percent}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
