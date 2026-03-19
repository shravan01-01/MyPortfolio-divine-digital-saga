import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Dharma Platform",
    subtitle: "एक महाग्रंथ",
    chapter: "Chapter I",
    desc: "A full-stack SaaS platform serving 10,000+ users. Built with React, Node.js, and PostgreSQL. Real-time dashboards, AI integrations, and enterprise-grade security.",
    tags: ["React", "Node.js", "PostgreSQL", "AWS"],
    icon: "🔱",
    color: "hsl(43 96% 56%)",
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Cosmic Commerce",
    subtitle: "व्यापार साम्राज्य",
    chapter: "Chapter II",
    desc: "An e-commerce empire handling 1M+ transactions. Microservices architecture, real-time inventory, and ML-powered recommendations.",
    tags: ["TypeScript", "GraphQL", "Redis", "Docker"],
    icon: "🏺",
    color: "hsl(28 100% 55%)",
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Veda AI",
    subtitle: "ज्ञान का भंडार",
    chapter: "Chapter III",
    desc: "An AI-powered knowledge management system. Natural language processing meets ancient wisdom. Processes and connects knowledge like the Vedic tradition.",
    tags: ["Python", "TensorFlow", "FastAPI", "MongoDB"],
    icon: "📜",
    color: "hsl(225 68% 55%)",
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Arjuna Dashboard",
    subtitle: "दृष्टि और नियंत्रण",
    chapter: "Chapter IV",
    desc: "Real-time analytics dashboard with the precision of Arjuna's aim. 100ms updates, complex visualizations, and predictive insights.",
    tags: ["React", "D3.js", "WebSocket", "Go"],
    icon: "🏹",
    color: "hsl(120 60% 40%)",
    link: "#",
    github: "#",
  },
  {
    id: 5,
    title: "Shakti Auth",
    subtitle: "सुरक्षा कवच",
    chapter: "Chapter V",
    desc: "Enterprise authentication system. Zero-trust security architecture, biometric auth, and compliance across 50+ countries.",
    tags: ["OAuth2", "JWT", "Kubernetes", "Rust"],
    icon: "⚔️",
    color: "hsl(0 68% 50%)",
    link: "#",
    github: "#",
  },
  {
    id: 6,
    title: "Indra Cloud",
    subtitle: "आकाश साम्राज्य",
    chapter: "Chapter VI",
    desc: "Cloud infrastructure automation tool. Deploys entire environments in minutes, inspired by Indra's mastery over the heavens.",
    tags: ["Terraform", "AWS", "Python", "CI/CD"],
    icon: "☁️",
    color: "hsl(200 90% 50%)",
    link: "#",
    github: "#",
  },
];

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-32 overflow-hidden texture-overlay">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full blur-3xl" style={{ background: "hsl(43 96% 56%)" }} />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full blur-3xl" style={{ background: "hsl(225 68% 35%)" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-sanskrit text-saffron/70 text-sm tracking-[0.3em] mb-3">मेरे महाकाव्य</p>
          <h2 className="section-heading font-divine text-4xl md:text-5xl mb-4">My Epics</h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Each project is a chapter in my digital Mahabharata — battles fought, wisdom gained
          </p>
          <div className="divider-ornate max-w-xs mx-auto mt-6">
            <span className="font-sanskrit text-gold/60 text-xl">✦</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              onClick={() => setExpanded(expanded === project.id ? null : project.id)}
              className="scroll-card p-6 cursor-pointer hover-fire group relative overflow-hidden"
              style={{ borderColor: `${project.color}30` }}
            >
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.color}08, transparent 60%)` }}
              />

              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="font-epic text-xs tracking-[0.3em]" style={{ color: `${project.color}90` }}>
                    {project.chapter}
                  </span>
                  <p className="font-sanskrit text-muted-foreground text-xs">{project.subtitle}</p>
                </div>
                <span className="text-3xl">{project.icon}</span>
              </div>

              {/* Title */}
              <h3 className="font-epic text-xl mb-3 group-hover:text-gold transition-colors duration-300">
                {project.title}
              </h3>

              {/* Scroll reveal animation */}
              <AnimatePresence>
                {expanded === project.id ? (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="font-body text-muted-foreground text-sm leading-relaxed mb-4 overflow-hidden"
                  >
                    {project.desc}
                  </motion.p>
                ) : (
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.desc}
                  </p>
                )}
              </AnimatePresence>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-epic text-xs px-2 py-1 rounded border"
                    style={{ borderColor: `${project.color}30`, color: `${project.color}`, background: `${project.color}10` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-3 border-t border-gold/10">
                <a
                  href={project.link}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 font-epic text-xs text-muted-foreground hover:text-gold transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> Live
                </a>
                <a
                  href={project.github}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 font-epic text-xs text-muted-foreground hover:text-gold transition-colors"
                >
                  <Github className="w-3 h-3" /> Source
                </a>
                <span className="ml-auto font-sanskrit text-xs text-gold/40">
                  {expanded === project.id ? "▲ पढ़ें कम" : "▼ पढ़ें"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
