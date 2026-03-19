import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <footer className="relative py-16 border-t border-gold/15 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-40 rounded-full blur-3xl"
          style={{ background: "hsl(43 96% 56%)" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          {/* Om symbol */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="font-sanskrit text-gold/50 text-5xl mb-4"
          >
            ॐ
          </motion.div>

          <p className="font-epic text-muted-foreground text-xs tracking-[0.3em] uppercase mb-2">
            Built with devotion & code
          </p>
          <p className="font-sanskrit text-saffron/40 text-sm">
            यदा यदा हि धर्मस्य ग्लानिर्भवति भारत
          </p>
          <p className="font-body text-muted-foreground/50 text-xs italic mt-1">
            — Bhagavad Gita 4.7
          </p>
        </div>

        <div className="divider-ornate mb-6 max-w-md mx-auto">
          <span className="font-sanskrit text-gold/30 text-lg">✦</span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="font-epic text-muted-foreground/50 text-xs tracking-widest">
            © 2024 · Your Name · All rights reserved
          </p>
          <div className="flex items-center gap-1 font-epic text-xs text-muted-foreground/40 tracking-wider">
            <span>Crafted in</span>
            <span className="font-sanskrit text-saffron/40">भारत</span>
            <span>with ❤️</span>
          </div>
          <p className="font-epic text-muted-foreground/50 text-xs tracking-widest">
            React · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
