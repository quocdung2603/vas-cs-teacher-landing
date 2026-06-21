import { motion } from "motion/react";
import { Terminal, ChevronDown, Sparkles, Code, Play } from "lucide-react";
import ParticleNetwork from "./ParticleNetwork";
import TerminalWidget from "./TerminalWidget";
import TextScramble from "./TextScramble";
import ScrollReveal from "./ScrollReveal";

export default function Hero() {
  const scrollToExplore = () => {
    const element = document.getElementById("who-am-i");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-dark-bg"
    >
      {/* Neural Network background canvas */}
      <ParticleNetwork />

      {/* Decorative top-right cyber purple glow spot */}
      <div className="absolute top-10 right-10 w-[300px] h-[300px] rounded-full bg-cyber-purple/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] rounded-full bg-cyber-cyan/10 blur-[100px] pointer-events-none" />

      {/* Grid overlay background lines */}
      <div className="absolute inset-0 bg-transparent bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full py-6">
          
          {/* Main Titles (Left Column) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Sparkle welcoming tag with slide entrance */}
            <ScrollReveal variant="slide-right" duration={0.8}>
              <div className="flex justify-center lg:justify-start">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20 uppercase">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  LÀM QUEN TRONG BUỔI ĐẦU TIÊN
                </span>
              </div>
            </ScrollReveal>

            {/* Main title: NGUYỄN QUỐC DŨNG */}
            <ScrollReveal variant="fade-up" delay={0.1} duration={0.8}>
              <div className="space-y-2">
                <h1 className="font-display text-4.5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
                  <TextScramble text="NGUYỄN QUỐC DŨNG" />
                </h1>
                
                {/* Subtitle: Computer Science Teacher */}
                <p className="font-mono text-sm sm:text-base tracking-[0.25em] text-gray-400 font-semibold uppercase flex items-center justify-center lg:justify-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
                  <TextScramble text="Computer Science Teacher" />
                </p>
              </div>
            </ScrollReveal>

            {/* Call Action Triggers */}
            <ScrollReveal variant="zoom-in" delay={0.35} duration={0.8}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={scrollToExplore}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple text-black font-display text-sm font-semibold tracking-wide hover:brightness-110 active:scale-98 transition-all hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] cursor-pointer shadow-lg flex items-center justify-center space-x-2"
                >
                  <Code className="w-4 h-4 flex-shrink-0" />
                  <span>Bắt Đầu Khám Phá</span>
                </button>

                <button
                  onClick={scrollToExplore}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all font-mono text-xs text-center cursor-pointer"
                >
                  cat ./intro.md
                </button>
              </div>
            </ScrollReveal>

            {/* Quick Specs labels */}
            <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-3 text-[10.5px] font-mono text-gray-500">
              <ScrollReveal variant="slide-left-full" delay={0.5} duration={1.0}>
                <span className="px-2.5 py-1 rounded bg-white/[0.02] border border-white/5 inline-block">
                  Class Room: <span className="text-gray-300 font-bold">VIỆT ANH 3</span>
                </span>
              </ScrollReveal>
              <ScrollReveal variant="slide-left-full" delay={0.65} duration={1.0}>
                <span className="px-2.5 py-1 rounded bg-white/[0.02] border border-white/5 inline-block">
                  Build: <span className="text-gray-300 font-bold">Node.js ES2022</span>
                </span>
              </ScrollReveal>
              <ScrollReveal variant="slide-left-full" delay={0.8} duration={1.0}>
                <span className="px-2.5 py-1 rounded bg-white/[0.02] border border-white/5 inline-block">
                  Subject: <span className="text-gray-300 font-bold">Tin Học & Lập Trình</span>
                </span>
              </ScrollReveal>
            </div>

          </div>

          {/* Interactive Shell CLI Terminal Widget (Right Column) */}
          <ScrollReveal variant="slide-left" delay={0.25} duration={0.8} className="lg:col-span-6 flex justify-center items-center w-full">
            <TerminalWidget />
          </ScrollReveal>

        </div>
      </div>

      {/* Pulse scroll indicator at bottom */}
      <div className="flex flex-col items-center justify-center relative select-none bottom-0">
        <button
          onClick={scrollToExplore}
          className="flex flex-col items-center justify-center text-gray-500 hover:text-cyber-cyan transition-colors group focus:outline-none cursor-pointer"
          aria-label="Scroll Down to Who Am I"
        >
          <span className="font-mono text-[9px] uppercase tracking-widest mb-2 group-hover:tracking-[0.2em] transition-all">
            Kéo xuống để xem tiếp
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-1 group-hover:border-cyber-cyan transition-colors">
            <div className="w-1.5 h-3 bg-cyber-cyan rounded-full animate-[bounce_1.8s_infinite] shadow-[0_0_10px_#06b6d4]" />
          </div>
        </button>
      </div>

    </section>
  );
}
