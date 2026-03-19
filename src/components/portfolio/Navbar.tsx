import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

const navItems = [
  { label: "About", href: "#about", sanskrit: "परिचय" },
  { label: "Skills", href: "#skills", sanskrit: "शस्त्र" },
  { label: "Projects", href: "#projects", sanskrit: "कृति" },
  { label: "Experience", href: "#experience", sanskrit: "अनुभव" },
  { label: "Contact", href: "#contact", sanskrit: "संपर्क" },
];

interface NavbarProps {
  isDayMode: boolean;
  onToggleMode: () => void;
}

export default function Navbar({ isDayMode, onToggleMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-gold/20 shadow-divine"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-divine text-sm md:text-base text-gold-shimmer hover:scale-105 transition-transform">
          <span className="font-sanskrit text-saffron mr-2">ॐ</span>
          Portfolio
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-divine group flex flex-col items-center">
              <span className="font-sanskrit text-[10px] text-saffron/60 group-hover:text-saffron transition-colors">
                {item.sanskrit}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={onToggleMode}
            className="relative w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center 
                       hover:border-gold/70 hover:shadow-glow transition-all duration-300 hover:scale-110"
          >
            <AnimatePresence mode="wait">
              {isDayMode ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <Sun className="w-4 h-4 text-saffron" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Moon className="w-4 h-4 text-gold" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile menu */}
          <button
            className="md:hidden w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-4 h-4 text-gold" /> : <Menu className="w-4 h-4 text-gold" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-gold/20"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-divine flex items-center gap-3"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="font-sanskrit text-saffron">{item.sanskrit}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
