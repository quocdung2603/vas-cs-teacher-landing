import { motion } from "motion/react";
import { MessageSquare, Quote, Sparkles } from "lucide-react";
import { QUOTES_DATA } from "../data";
import ScrollReveal from "./ScrollReveal";
import TextScramble from "./TextScramble";

export default function ShareInspire() {
  return (
    <section id="quotes" className="relative py-28 sm:py-36 bg-slate-950 overflow-hidden">
      
      {/* Decorative vertical lines on sides */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />

      {/* Cyber glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyber-purple/5 blur-[200px] pointer-events-none animate-pulse-slow" />
      <div className="absolute -top-12 left-1/3 w-[300px] h-[300px] bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header quotes tag */}
        <ScrollReveal variant="slide-up-large" duration={0.8}>
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20 uppercase mb-3.5">
              <Quote className="w-3.5 h-3.5 mr-1.5 fill-cyber-cyan/10" />
              Lời Thầy Muốn Gửi Gắm
            </div>
            <h2 className="font-display text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white mb-2.5">
              <TextScramble text="Thông Điệp Truyền Cảm Hứng" /> <span className="text-gradient-cyan-blue">/ <TextScramble text="Inspiration" /></span>
            </h2>
            <div className="h-[2px] w-16 bg-gradient-to-r from-cyber-cyan to-cyber-purple mx-auto mt-4" />
          </div>
        </ScrollReveal>

        {/* Large quotes list with scroll reveal entries */}
        <div className="space-y-16 md:space-y-24">
          {QUOTES_DATA.map((quote, index) => {
            const isLeft = index % 2 === 0;
            return (
              <ScrollReveal 
                key={quote.id}
                variant={isLeft ? "slide-right-large" : "slide-left-large"}
                delay={0.1}
                duration={0.8}
                className="w-full"
              >
                <div
                  className={`relative p-8 sm:p-12 rounded-3xl glass border border-white/5 hover:border-white/12 transition-all duration-500 group cursor-default ${
                    isLeft
                      ? "hover:-translate-y-2.5 hover:translate-x-2 hover:rotate-1 hover:scale-[1.015] hover:shadow-[15px_30px_60px_rgba(6,182,212,0.12)]"
                      : "hover:-translate-y-2.5 hover:-translate-x-2 hover:-rotate-1 hover:scale-[1.015] hover:shadow-[-15px_30px_60px_rgba(147,51,234,0.12)]"
                  }`}
                  id={`quote-card-${quote.id}`}
                >
                  {/* Huge back watermark index for cyberpunk vibe */}
                  <span className="absolute -top-6 -right-3 text-[90px] sm:text-[140px] font-display font-extrabold text-white/[0.02] group-hover:text-cyber-cyan/[0.04] transition-colors leading-none select-none pointer-events-none">
                    0{quote.id}
                  </span>

                  {/* Laser line left highlight */}
                  <div className="absolute top-8 bottom-8 left-0 w-[3px] bg-gradient-to-b from-cyber-cyan via-cyber-purple to-transparent rounded-r" />

                  {/* Sparkling icon top right */}
                  <Sparkles className="absolute top-6 right-6 w-5 h-5 text-gray-700 group-hover:text-cyber-purple transition-colors animate-pulse" />

                  <div className="space-y-6">
                    {/* Big Quote sign */}
                    <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-center">
                      <Quote className="w-5 h-5 text-cyber-cyan fill-cyber-cyan/5" />
                    </div>

                    {/* Core Content */}
                    <p className="font-display font-semibold sm:font-bold text-lg sm:text-2xl text-white group-hover:text-gradient-purple-cyan leading-relaxed transition-all duration-300">
                      "{quote.content}"
                    </p>

                    <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                      
                      {/* Author block */}
                      <div className="flex items-center space-x-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyber-purple" />
                        <span className="font-sans font-bold text-xs sm:text-sm text-gray-200 tracking-wider">
                          {quote.author}
                        </span>
                        <span className="text-gray-600 text-xs font-mono">• Chuyên mục</span>
                      </div>

                      {/* Subtext description */}
                      <span className="font-mono text-[11px] sm:text-xs text-gray-400">
                        {quote.subtext}
                      </span>

                    </div>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
