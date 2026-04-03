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

        {/* Creative Skills List */}
        <div className="max-w-4xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="mb-16"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">
                    {category === "Technical" ? "⚡" : category === "Data" ? "📊" : "🛠️"}
                  </span>
                </div>
                <div>
                  <h3 className="font-epic text-2xl text-foreground mb-1">{category}</h3>
                  <p className="font-body text-muted-foreground text-sm">
                    {category === "Technical" ? "Programming & development" :
                     category === "Data" ? "Analysis & visualization" :
                     "Frameworks & utilities"}
                  </p>
                </div>
              </div>

              {/* Skills List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: categoryIndex * 0.2 + i * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border border-primary/10 hover:border-primary/20 hover:bg-card transition-all duration-300">
                        <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                        <div className="flex-1">
                          <span className="font-epic text-foreground group-hover:text-primary transition-colors duration-300">
                            {skill.name}
                          </span>
                        </div>
                        <div className="text-primary/60 text-sm font-sanskrit">
                          {category === "Technical" ? "तेज" : category === "Data" ? "ज्ञान" : "उपकरण"}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}