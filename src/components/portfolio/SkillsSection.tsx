import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cv } from "@/data/cv";

const weapons = cv.skills.map((skill, i) => ({
  name: skill,
  level: 80 + (i % 5) * 4,
  weapon: skill,
  desc: skill,
  icon: "⚡",
  color: ["hsl(43 96% 56%)", "hsl(225 68% 55%)", "hsl(120 60% 40%)", "hsl(28 100% 55%)", "hsl(190 90% 50%)"][i % 5],
}));

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background mandalas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{ border: "1px solid hsl(43 96% 56%)", boxShadow: "0 0 0 40px hsl(43 96% 56% / 0.01), 0 0 0 80px hsl(43 96% 56% / 0.01)" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04] border border-saffron/30 chakra-spin" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-[0.06] border border-gold/20" style={{ animation: "chakra-rotate 20s linear infinite reverse" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-sanskrit text-saffron/70 text-sm tracking-[0.3em] mb-3">मेरे शस्त्र और अस्त्र</p>
          <h2 className="section-heading font-divine text-4xl md:text-5xl mb-4">Shastra & Astra</h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Like a warrior's arsenal, these are the tools I wield in the digital battlefield
          </p>
          <div className="divider-ornate max-w-xs mx-auto mt-6">
            <span className="font-sanskrit text-gold/60 text-xl">✦</span>
          </div>
        </motion.div>

        {/* Weapons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {weapons.map((weapon, i) => (
            <motion.div
              key={weapon.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="weapon-badge rounded p-5 group relative overflow-hidden"
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at center, ${weapon.color}10, transparent 70%)` }}
              />

              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">{weapon.icon}</span>
                <div className="flex-1">
                  <h4 className="font-epic text-sm tracking-wider" style={{ color: weapon.color }}>
                    {weapon.weapon}
                  </h4>
                  <p className="font-divine text-foreground text-base">{weapon.name}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-body text-muted-foreground text-xs">{weapon.desc}</span>
                  <span className="font-epic text-xs" style={{ color: weapon.color }}>{weapon.level}%</span>
                </div>
                <div className="h-1 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${weapon.level}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.04, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${weapon.color}80, ${weapon.color})` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
