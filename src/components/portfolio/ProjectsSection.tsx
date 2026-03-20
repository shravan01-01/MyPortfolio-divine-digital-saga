import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { cv } from "@/data/cv";

const projects = cv.projects.map((project, index) => ({
  id: index + 1,
  title: project.title,
  subtitle: project.title,
  chapter: `Project ${index + 1}`,
  desc: project.description,
  tags: project.tech,
  icon: "🌟",
  color: "hsl(43 96% 56%)",
  link: "#",
  github: "#",
}));

interface ProjectsSectionProps {
  isKrishnaMode?: boolean;
}

export default function ProjectsSection({ isKrishnaMode = false }: ProjectsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="relative py-32 overflow-hidden texture-overlay"
      style={isKrishnaMode ? { background: "hsl(0 0% 100%)" } : undefined}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div
          className="absolute top-1/4 right-0 w-80 h-80 rounded-full blur-3xl"
          style={{ background: isKrishnaMode ? "hsl(196 90% 28%)" : "hsl(43 96% 56%)" }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full blur-3xl"
          style={{ background: isKrishnaMode ? "hsl(194 50% 52%)" : "hsl(225 68% 35%)" }}
        />
      </div>

      {/* Krishna: peacock teal top stripe */}
      {isKrishnaMode && (
        <div
          className="absolute top-0 inset-x-0 h-1"
          style={{ background: "linear-gradient(to right, transparent, hsl(194 50% 52% / 0.7), hsl(196 90% 28% / 0.5), transparent)" }}
        />
      )}

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
                style={{
                  background: isKrishnaMode
                    ? "radial-gradient(ellipse at 50% 0%, hsl(196 90% 28% / 0.08), transparent 60%)"
                    : `radial-gradient(ellipse at 50% 0%, ${project.color}08, transparent 60%)`
                }}
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
                    style={{
                      borderColor: isKrishnaMode ? "hsl(196 90% 28% / 0.3)" : `${project.color}30`,
                      color: isKrishnaMode ? "hsl(196 90% 28%)" : project.color,
                      background: isKrishnaMode ? "hsl(196 90% 28% / 0.07)" : `${project.color}10`,
                    }}
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
