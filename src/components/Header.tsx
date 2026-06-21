import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Terminal, ArrowRight } from "lucide-react";
import TextScramble from "./TextScramble";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      // Is scrolled offset
      setIsScrolled(window.scrollY > 40);

      // Scroll progress percentage calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Active section calculation using offset top
      const sectionIds = ["hero", "who-am-i", "interests", "quotes", "contact"];
      const scrollPosition = window.scrollY + 140; // offset index for sticky header and tolerance

      // Special case: check if we are at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initialize immediately on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-blue z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-dark-bg/85 backdrop-blur-md border-b border-white/5 py-3 shadow-[0_10px_30px_rgba(3,7,18,0.3)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center space-x-2.5 group cursor-pointer focus:outline-none"
            id="nav-logo"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyber-purple to-cyber-cyan flex items-center justify-center shadow-md shadow-cyber-purple/20 group-hover:scale-105 transition-transform duration-300">
              <Terminal className="w-5 h-5 text-black hover:rotate-12 transition-transform" />
            </div>
            <div className="text-left">
              <span className="block font-display font-bold tracking-wider text-sm text-white group-hover:text-cyber-cyan transition-colors">
                <TextScramble text="N.Q.DŨNG" />
              </span>
              <span className="block font-mono text-[10px] text-gray-400 tracking-widest uppercase">
                <TextScramble text="Tin học • VIỆT ANH 3" />
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { id: "hero", label: "Hero" },
              { id: "who-am-i", label: "Tôi là ai?" },
              { id: "interests", label: "Sở thích" },
              { id: "quotes", label: "Khát vọng" },
              { id: "contact", label: "Liên hệ" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer focus:outline-none relative ${
                  activeSection === item.id
                    ? "text-cyber-cyan font-semibold bg-cyber-cyan/5"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {/* Active indicator underline */}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-cyber-cyan shadow-[0_0_8px_#06b6d4]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <TextScramble text={item.label} />
              </button>
            ))}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => scrollToSection("contact")}
              className="relative px-4 py-2 rounded-lg font-display text-xs font-semibold text-white overflow-hidden group focus:outline-none cursor-pointer"
            >
              <span className="absolute inset-0 bg-white/5 rounded-lg border border-white/10 group-hover:border-cyber-cyan/30 transition-all duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center space-x-1.5 justify-center z-10 text-gray-200 group-hover:text-cyber-cyan transition-colors">
                <span><TextScramble text="Tham gia bài lớp" /></span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white cursor-pointer focus:outline-none"
            aria-label="Toggle Menu"
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] bg-dark-bg/95 backdrop-blur-lg border-b border-white/10 z-30 py-6 px-4 md:hidden shadow-2xl flex flex-col space-y-4"
          >
            <div className="flex flex-col space-y-2">
              {[
                { id: "hero", label: "🎯 Trang chủ" },
                { id: "who-am-i", label: "👨‍🏫 Thầy Dũng là ai?" },
                { id: "interests", label: "⚽ Đam mê & Sở thích" },
                { id: "quotes", label: "🗣️ Lời khuyên cho học sinh" },
                { id: "contact", label: "📱 Liên kết liên hệ" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20"
                      : "hover:bg-white/5 text-gray-200 hover:text-cyber-cyan"
                  }`}
                >
                  <TextScramble text={item.label} />
                </button>
              ))}
            </div>
            <div className="pt-2 border-t border-white/5">
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-purple/20 to-cyber-cyan/20 border border-cyber-cyan/30 text-cyber-cyan font-display text-sm font-semibold tracking-wide text-center"
              >
                <TextScramble text="Gặp Thầy Ngay" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
