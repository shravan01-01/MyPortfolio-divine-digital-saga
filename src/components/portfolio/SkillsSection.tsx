import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cv } from "@/data/cv";

const skills = cv.skills.map((skill, i) => ({
  name: skill,
  level: [85, 80, 75, 90, 70, 85, 80, 75, 70][i] || 75, // Realistic levels
  description: skill,
  category: i < 3 ? "Technical" : i < 6 ? "Data" : "Tools",
}));

interface SkillsSectionProps {
  isKrishnaMode?: boolean;
}

export default function SkillsSection({ isKrishnaMode = false }: SkillsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const categories = ["Technical", "Data", "Tools"];

  return (
    <section
      id="skills"
      className="relative py-24 bg-muted/10"
    >
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sanskrit text-gold/70 text-sm tracking-wider mb-3">मेरे शस्त्र और अस्त्र</p>
          <h2 className="font-divine text-4xl md:text-5xl mb-4">Skills & Expertise</h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I wield to bring ideas to life
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-saffron mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-card p-6 rounded-xl shadow-md border border-gold/10 hover:shadow-lg transition-all duration-300 hover:border-gold/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-epic text-lg text-foreground">{skill.name}</h3>
                <span className="font-epic text-sm text-gold/60">{skill.level}%</span>
              </div>

              <div className="space-y-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-gold to-saffron rounded-full"
                  />
                </div>
                <p className="font-body text-muted-foreground text-sm">{skill.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill categories */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {categories.map((category, i) => (
            <div key={category} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-saffron/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">
                  {category === "Technical" ? "⚡" : category === "Data" ? "📊" : "🛠️"}
                </span>
              </div>
              <h3 className="font-epic text-lg mb-2">{category}</h3>
              <p className="font-body text-muted-foreground text-sm">
                {category === "Technical" ? "Programming & development" :
                 category === "Data" ? "Analysis & visualization" :
                 "Frameworks & utilities"}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}