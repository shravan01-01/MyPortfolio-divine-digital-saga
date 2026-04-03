import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MapPin, Phone, Github, Linkedin, Code2 } from "lucide-react";
import { cv } from "@/data/cv";

interface ContactSectionProps {
  isKrishnaMode?: boolean;
}

export default function ContactSection({ isKrishnaMode = false }: ContactSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative py-24"
    >

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-sanskrit text-saffron/70 text-sm tracking-[0.3em] mb-3">दिव्य संवाद</p>
          <h2 className="section-heading font-divine text-4xl md:text-5xl mb-4">Divine Connection</h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Like invoking a deity with sacred mantras, reach out and together we shall create something extraordinary
          </p>
          <div className="divider-ornate max-w-xs mx-auto mt-6">
            <span className="font-sanskrit text-gold/60 text-xl">✦</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Left — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-epic text-gold text-xl mb-2">Let's Create Together</h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Whether you seek a warrior for your next project or a sage for consultation —
                the universe conspires to bring worthy souls together.
              </p>
            </div>

            {[
              { Icon: Mail, label: "Email", value: cv.personal.email, sanskrit: "पत्र" },
              { Icon: MapPin, label: "Location", value: cv.personal.location, sanskrit: "स्थान" },
              { Icon: Phone, label: "Phone", value: cv.personal.phone, sanskrit: "वार्ता" },
            ].map(({ Icon, label, value, sanskrit }) => (
              <div key={label} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center
                               group-hover:border-gold group-hover:shadow-glow transition-all duration-300 bg-card flex-shrink-0">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="font-sanskrit text-saffron/60 text-xs">{sanskrit}</p>
                  <p className="font-epic text-xs text-muted-foreground tracking-widest uppercase">{label}</p>
                  <p className="font-body text-foreground">{value}</p>
                </div>
              </div>
            ))}

            {/* Social icons */}
            <div className="pt-4">
              <p className="font-epic text-xs text-muted-foreground tracking-widest uppercase mb-4">Social Presence</p>
              <div className="flex gap-3">
                {[
                  { label: "GitHub", url: cv.personal.github, Icon: Github },
                  { label: "LinkedIn", url: cv.personal.linkedin, Icon: Linkedin },
                  { label: "LeetCode", url: cv.personal.leetcode, Icon: Code2 },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center 
                               hover:border-gold hover:shadow-glow transition-all duration-300"
                    title={item.label}
                  >
                    <item.Icon className="w-4 h-4 text-gold" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="scroll-card p-8 space-y-6">
              {[
                { name: "name", label: "Your Name", sanskrit: "नाम", placeholder: "Arjuna the Developer" },
                { name: "email", label: "Email Address", sanskrit: "ई-पत्र", placeholder: "arjuna@battlefield.com" },
              ].map((field) => (
                <div key={field.name} className="space-y-2 group">
                  <div className="flex items-center gap-2">
                    <label className="font-epic text-xs tracking-widest uppercase text-muted-foreground">{field.label}</label>
                    <span className="font-sanskrit text-saffron/50 text-xs">{field.sanskrit}</span>
                  </div>
                  <input
                    type={field.name === "email" ? "email" : "text"}
                    value={form[field.name as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    placeholder={field.placeholder}
                    required
                    className="w-full bg-muted/30 border border-gold/20 rounded px-4 py-3 font-body text-foreground 
                               placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/60 
                               focus:shadow-glow transition-all duration-300"
                  />
                </div>
              ))}

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="font-epic text-xs tracking-widest uppercase text-muted-foreground">Message</label>
                  <span className="font-sanskrit text-saffron/50 text-xs">संदेश</span>
                </div>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share your vision, your quest, your dharma..."
                  required
                  rows={5}
                  className="w-full bg-muted/30 border border-gold/20 rounded px-4 py-3 font-body text-foreground 
                             placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/60 
                             focus:shadow-glow transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="relative w-full group py-4 font-epic text-sm tracking-widest uppercase overflow-hidden 
                           transition-all duration-500"
                style={{
                  background: sent
                    ? "linear-gradient(135deg, hsl(130 32% 25%), hsl(130 32% 35%))"
                    : isKrishnaMode
                      ? "linear-gradient(135deg, hsl(196 90% 20%), hsl(196 90% 28%), hsl(194 50% 36%))"
                      : "linear-gradient(135deg, hsl(43 96% 35%), hsl(43 96% 56%), hsl(43 96% 35%))",
                  backgroundSize: "200% auto",
                  color: "hsl(0 0% 100%)",
                  border: sent
                    ? "1px solid hsl(130 32% 40%)"
                    : isKrishnaMode
                      ? "1px solid hsl(196 90% 45%)"
                      : "1px solid hsl(43 96% 56%)",
                  boxShadow: sent
                    ? "0 0 30px hsl(130 32% 35% / 0.4)"
                    : isKrishnaMode
                      ? "0 0 20px hsl(196 90% 28% / 0.35)"
                      : "0 0 20px hsl(43 96% 56% / 0.3)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {sent ? (
                    <>
                      <span className="font-sanskrit">ॐ</span> Mantra Invoked Successfully
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Invoke the Message
                      <span className="font-sanskrit text-xs opacity-70">प्रेषित करें</span>
                    </>
                  )}
                </span>
                {/* Glow animation on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: isKrishnaMode ? "hsl(194 50% 52% / 0.15)" : "hsl(28 100% 55% / 0.10)" }}
                />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
