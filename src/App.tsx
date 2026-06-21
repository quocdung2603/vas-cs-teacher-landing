import { useState, useEffect } from "react";
import { ArrowUp, Star, Laptop, Heart, GraduationCap } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import WhoAmI from "./components/WhoAmI";
import InterestsGrid from "./components/InterestsGrid";
import ShareInspire from "./components/ShareInspire";
import MotivationalStars from "./components/MotivationalStars";
import ContactCard from "./components/ContactCard";
import CyberBackground from "./components/CyberBackground";

export default function App() {
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-150 antialiased selection:bg-cyber-purple/30 selection:text-white relative overflow-x-hidden">
      
      {/* Dynamic Cinematic Sci-Fi Cybernetic Background */}
      <CyberBackground />
      
      {/* Visual cybernetic lighting backdrop rings globally */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-cyber-cyan/5 via-cyber-purple/1-percent to-transparent pointer-events-none" />

      {/* Floating Header */}
      <Header />

      {/* Main Sections */}
      <main className="relative">
        {/* SECTION 1 - HERO */}
        <Hero />

        {/* SECTION 2 - WHO AM I */}
        <WhoAmI />

        {/* SECTION 4 - MY INTERESTS */}
        <InterestsGrid />

        {/* SECTION 5 - WHAT I WANT TO SHARE WITH YOU (Quotes) */}
        <ShareInspire />

        {/* SECTION 6 - THE FUTURE STARTS TODAY */}
        <MotivationalStars />

        {/* SECTION 7 - CONTACT */}
        <ContactCard />
      </main>

      {/* SECTION 8 - FOOTER */}
      <footer className="relative bg-slate-950 border-t border-white/5 py-12 text-center overflow-hidden">
        {/* Futuristic scan grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-5 relative z-10 select-text">
          
          <div className="flex justify-center space-x-3 text-gray-600">
            <GraduationCap className="w-5 h-5 hover:text-cyber-cyan transition-colors" />
            <span className="text-gray-700">|</span>
            <Laptop className="w-5 h-5 hover:text-cyber-purple transition-colors" />
            <span className="text-gray-700">|</span>
            <Star className="w-5 h-5 hover:text-cyber-emerald transition-colors" />
          </div>

          <p className="font-display font-medium text-gray-400 text-sm tracking-wide">
            © 2026 Nguyễn Quốc Dũng • Giáo viên Tin học
          </p>

          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gradient-purple-cyan font-bold select-all leading-relaxed">
            "Keep Learning. Keep Growing."
          </p>

          <p className="text-[10px] text-gray-600 font-mono pt-2">
            Được thiết kế tỉ mỉ với Giao diện Phản hồi Cao • Bình Dương, Bình Phước
          </p>
        </div>
      </footer>

      {/* Floating Scroll To Top trigger */}
      {showToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-slate-900/90 border border-white/10 text-gray-400 hover:text-white hover:border-cyber-cyan hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-lg"
          aria-label="Cuộn lên đầu trang"
          id="scroll-to-top-button"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
