import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cv } from "@/data/cv";

const journey = [
  { year: "2021", title: "SSC Completion", subtitle: "यश", desc: "Completed secondary school with strong foundation in STEM.", icon: "🎓" },
  { year: "2023", title: "HSC Completion", subtitle: "उन्नति", desc: "Completed higher secondary with PCM + IT and started AI/DS journey.", icon: "🧠" },
  { year: "2023", title: "Engineering: AI & DS", subtitle: "प्रगति", desc: "Started Bachelor of Engineering (AI & DS) at Ajeenkya DY Patil School of Engineering.", icon: "🏛️" },
  { year: "2024", title: "Data Analyst Intern", subtitle: "अनुभव", desc: "Joined iGurus consultancy to build analytics dashboards and data pipelines.", icon: "📊" },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden texture-overlay">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "hsl(43 96% 56%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "hsl(0 68% 35%)" }}
        />
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
          <p className="font-sanskrit text-saffron/70 text-sm tracking-[0.3em] mb-3">मेरी यात्रा</p>
          <h2 className="section-heading font-divine text-4xl md:text-5xl mb-4">My Journey</h2>
          <div className="divider-ornate max-w-xs mx-auto">
            <span className="font-sanskrit text-gold/60 text-xl">✦</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Story text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="scroll-card p-8 md:p-10 relative">
              {/* Decorative corner */}
              <div className="absolute top-4 left-4 w-8 h-8 opacity-40">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M0 0 L12 0 L12 1 L1 1 L1 12 L0 12 Z" fill="hsl(43 96% 56%)" />
                </svg>
              </div>
              <div className="absolute bottom-4 right-4 w-8 h-8 opacity-40 rotate-180">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M0 0 L12 0 L12 1 L1 1 L1 12 L0 12 Z" fill="hsl(43 96% 56%)" />
                </svg>
              </div>

              <p className="font-sanskrit text-saffron/80 text-lg mb-4">यत्र योगेश्वरः कृष्णः</p>
              <h3 className="font-epic text-gold text-2xl mb-6">The Student-Developer</h3>
              <p className="font-body text-muted-foreground text-lg leading-relaxed mb-4">
                {cv.personal.summary}
              </p>
              <p className="font-body text-muted-foreground text-lg leading-relaxed mb-6">
                I combine AI, data analysis, and web development with a strong focus on problem-solving and real-world impact.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { num: "4", label: "Projects", sanskrit: "परियोजनाएं" },
                  { num: "2", label: "Years", sanskrit: "वर्ष" },
                  { num: "100%", label: "Passion", sanskrit: "जुनून" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center border-divine rounded p-3">
                    <div className="font-divine text-gold text-2xl">{stat.num}</div>
                    <div className="font-sanskrit text-saffron/60 text-xs">{stat.sanskrit}</div>
                    <div className="font-epic text-muted-foreground text-xs tracking-widest uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, hsl(43 96% 56% / 0.5), transparent)" }}
            />

            {journey.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                className="relative pl-16 pb-10 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center
                               text-xl bg-card group-hover:border-gold group-hover:shadow-glow transition-all duration-300">
                  {item.icon}
                </div>

                <div className="glass-card p-5 hover-fire rounded">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-epic text-gold/60 text-xs tracking-widest">{item.year}</span>
                    <span className="font-sanskrit text-saffron/60 text-xs">{item.subtitle}</span>
                  </div>
                  <h4 className="font-epic text-gold text-lg mb-2">{item.title}</h4>
                  <p className="font-body text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
