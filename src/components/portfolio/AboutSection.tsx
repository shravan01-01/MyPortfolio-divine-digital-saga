import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cv } from "@/data/cv";

const journey = [
  { year: "2021", title: "SSC Completion", subtitle: "यश", desc: "Completed secondary school with strong foundation in STEM.", icon: "🎓" },
  { year: "2023", title: "HSC Completion", subtitle: "उन्नति", desc: "Completed higher secondary with PCM + IT and started AI/DS journey.", icon: "🧠" },
  { year: "2023", title: "Engineering: AI & DS", subtitle: "प्रगति", desc: "Started Bachelor of Engineering (AI & DS) at Ajeenkya DY Patil School of Engineering.", icon: "🏛️" },
  { year: "2024", title: "Data Analyst Intern", subtitle: "अनुभव", desc: "Joined iGurus consultancy to build analytics dashboards and data pipelines.", icon: "📊" },
];

interface AboutSectionProps {
  isKrishnaMode?: boolean;
}

export default function AboutSection({ isKrishnaMode = false }: AboutSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative py-24"
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
          <p className="font-sanskrit text-gold/70 text-sm tracking-wider mb-3">मेरी यात्रा</p>
          <h2 className="font-divine text-4xl md:text-5xl mb-4">My Journey</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-saffron mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Story text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="bg-card p-8 md:p-10 rounded-xl shadow-lg border border-gold/10">
              <p className="font-sanskrit text-gold/80 text-lg mb-4">यत्र योगेश्वरः कृष्णः</p>
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
                  <div key={stat.label} className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="font-divine text-gold text-2xl">{stat.num}</div>
                    <div className="font-sanskrit text-gold/60 text-xs">{stat.sanskrit}</div>
                    <div className="font-epic text-muted-foreground text-xs tracking-wider uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-saffron to-gold"></div>

            {journey.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                className="relative pl-16 pb-8"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-12 h-12 rounded-full border-2 border-gold bg-card flex items-center justify-center text-xl shadow-lg">
                  {item.icon}
                </div>

                <div className="bg-card p-6 rounded-xl shadow-md border border-gold/10 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-epic text-gold/60 text-sm tracking-wider">{item.year}</span>
                    <span className="font-sanskrit text-gold/60 text-sm">{item.subtitle}</span>
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
