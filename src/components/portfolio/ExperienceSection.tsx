import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cv } from "@/data/cv";

const experiences = cv.experience.map((exp) => ({
  role: exp.role,
  company: exp.company,
  period: exp.period,
  sanskrit: "अनुभव",
  desc: exp.details,
  achievements: exp.achievements,
  dharma: "Data Analytics",
  icon: "📊",
}));

interface ExperienceSectionProps {
  isKrishnaMode?: boolean;
}

export default function ExperienceSection({ isKrishnaMode = false }: ExperienceSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      className="relative py-24 bg-muted/10"
    >

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-sanskrit text-saffron/70 text-sm tracking-[0.3em] mb-3">मेरा धर्म पथ</p>
          <h2 className="section-heading font-divine text-4xl md:text-5xl mb-4">My Karma</h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Each role a dharma, each company a battlefield, each achievement a victory in the cosmic war
          </p>
          <div className="divider-ornate max-w-xs mx-auto mt-6">
            <span className="font-sanskrit text-gold/60 text-xl">✦</span>
          </div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central path */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{
              background: isKrishnaMode
                ? "linear-gradient(to bottom, transparent, hsl(196 90% 28% / 0.5) 10%, hsl(194 50% 52% / 0.4) 90%, transparent)"
                : "linear-gradient(to bottom, transparent, hsl(43 96% 56% / 0.4) 10%, hsl(43 96% 56% / 0.4) 90%, transparent)"
            }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className={`relative flex gap-6 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Card */}
              <div className="flex-1 scroll-card p-6 group hover-fire relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: isKrishnaMode
                      ? "radial-gradient(ellipse at 50% 0%, hsl(196 90% 28% / 0.07), transparent 60%)"
                      : "radial-gradient(ellipse at 50% 0%, hsl(43 96% 56% / 0.06), transparent 60%)"
                  }}
                />

                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-epic text-xs text-saffron/70 tracking-[0.2em]">{exp.period}</span>
                    <span className="ml-3 font-sanskrit text-gold/40 text-xs">{exp.sanskrit}</span>
                  </div>
                  <span className="text-2xl">{exp.icon}</span>
                </div>

                <h3 className="font-epic text-gold text-lg mb-1">{exp.role}</h3>
                <p className="font-body text-saffron/70 text-sm mb-3">{exp.company}</p>
                <p className="font-body text-muted-foreground leading-relaxed mb-4 text-sm">{exp.desc}</p>

                <div className="space-y-1">
                  {exp.achievements.map((ach) => (
                    <div key={ach} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold/60 flex-shrink-0" />
                      <span className="font-body text-muted-foreground text-xs">{ach}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gold/10">
                  <span className="font-epic text-xs text-gold/50 tracking-widest uppercase">
                    Dharma: {exp.dharma}
                  </span>
                </div>
              </div>

              {/* Central chakra node */}
              <div className="hidden md:flex items-start justify-center w-12 flex-shrink-0 pt-4">
                <div className="w-10 h-10 rounded-full border-2 border-gold/50 flex items-center justify-center bg-background
                               shadow-glow relative">
                  <div className="w-3 h-3 rounded-full bg-gold animate-divine-pulse" />
                  {/* Horizontal connector */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 w-6 h-px bg-gold/30
                                ${i % 2 === 0 ? "right-full" : "left-full"}`}
                  />
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
