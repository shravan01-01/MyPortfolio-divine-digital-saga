import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { cv } from "@/data/cv";

const projects = cv.projects.map((project, index) => ({
  id: index + 1,
  title: project.title,
  description: project.description,
  tech: project.tech,
  link: "#", // Placeholder - should be updated with real links
  github: "#", // Placeholder - should be updated with real links
}));

interface ProjectsSectionProps {
  isKrishnaMode?: boolean;
}

export default function ProjectsSection({ isKrishnaMode = false }: ProjectsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      className="relative py-24"
    >
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sanskrit text-gold/70 text-sm tracking-wider mb-3">मेरे महाकाव्य</p>
          <h2 className="font-divine text-4xl md:text-5xl mb-4">My Projects</h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcasing my work in AI, data analysis, and web development
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-saffron mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-card rounded-xl shadow-md border border-gold/10 hover:shadow-lg hover:border-gold/20 transition-all duration-300 overflow-hidden group"
            >
              {/* Project header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-epic text-xl text-foreground mb-2 group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gold/10 text-gold text-xs font-epic rounded-full border border-gold/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-epic rounded-full">
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    className="flex items-center gap-2 text-gold hover:text-saffron transition-colors text-sm font-epic"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-gold hover:text-saffron transition-colors text-sm font-epic"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="font-body text-muted-foreground mb-6">
            Interested in seeing more of my work or discussing a project?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gold to-saffron text-background font-epic text-sm tracking-wider uppercase rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Let's Connect
          </a>
        </motion.div>
      </div>
    </section>
  );
}