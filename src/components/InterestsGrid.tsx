import React, { useState } from "react";
import { Activity, Map, Cpu, CheckCircle, Flame, UploadCloud } from "lucide-react";
import { INTERESTS_DATA } from "../data";
import ScrollReveal from "./ScrollReveal";
import TextScramble from "./TextScramble";

interface RotateState {
  cardId: number | null;
  rotateX: number;
  rotateY: number;
  spotlightX: number;
  spotlightY: number;
}

export default function InterestsGrid() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [hoverState, setHoverState] = useState<RotateState>({
    cardId: null,
    rotateX: 0,
    rotateY: 0,
    spotlightX: 0,
    spotlightY: 0
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top; // y position within element
    
    // Normalize values between -0.5 and 0.5
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    // Calculate rotation: max 12 degrees tilt
    const rotateX = normalizedY * -12; // tilt on X axis
    const rotateY = normalizedX * 12;  // tilt on Y axis

    setHoverState({
      cardId: id,
      rotateX,
      rotateY,
      spotlightX: x,
      spotlightY: y
    });
  };

  const handleMouseLeave = () => {
    setHoverState({
      cardId: null,
      rotateX: 0,
      rotateY: 0,
      spotlightX: 0,
      spotlightY: 0
    });
  };

  const [cardImages, setCardImages] = useState<Record<number, string>>({
    1: "/assets/interest_football.png",
    2: "/assets/avatar_horse.png", // The photo of teacher sitting on a field with black horse
    3: "/assets/interest_tech.png"
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Activity":
        return <Activity className="w-8 h-8 text-orange-400" />;
      case "Map":
        return <Map className="w-8 h-8 text-blue-400" />;
      case "Cpu":
        return <Cpu className="w-8 h-8 text-purple-400" />;
      default:
        return <Cpu className="w-8 h-8 text-gray-400" />;
    }
  };

  const getGradientText = (id: number) => {
    switch (id) {
      case 1: return "text-gradient-orange-purple";
      case 2: return "text-gradient-cyan-blue";
      case 3: return "text-gradient-purple-cyan";
      default: return "text-white";
    }
  };

  const getAccentBorder = (id: number) => {
    switch (id) {
      case 1: return "group-hover:border-orange-500/30";
      case 2: return "group-hover:border-blue-500/30";
      case 3: return "group-hover:border-purple-500/30";
      default: return "group-hover:border-cyber-cyan/30";
    }
  };

  return (
    <section id="interests" className="relative py-24 sm:py-32 overflow-hidden bg-slate-950/20">
      
      {/* Visual background layers */}
      <div className="absolute bottom-0 left-1/3 w-[380px] h-[380px] rounded-full bg-cyber-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/3 w-[380px] h-[380px] rounded-full bg-cyber-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section header */}
        <ScrollReveal variant="slide-up-large" duration={0.8}>
          <div className="text-center mb-16 md:mb-24">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest text-cyber-blue bg-cyber-blue/10 border border-cyber-blue/20 uppercase mb-3">
              <Flame className="w-3.5 h-3.5 mr-1" />
              Đam mê và Lối sống
            </span>
            <h2 className="font-display text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white">
              <TextScramble text="Sở Thích Cá Nhân" /> <span className="text-gradient-orange-purple">/ <TextScramble text="My Interests" /></span>
            </h2>
            <p className="font-sans text-sm text-gray-400 max-w-md mx-auto mt-3">
              Những mảnh ghép tạo nên cuộc sống cân bằng và nguồn cảm hứng tích cực của Thầy Dũng ngoài giờ lên lớp.
            </p>
            <div className="h-[2px] w-16 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto mt-4" />
          </div>
        </ScrollReveal>

        {/* 3 Large interactive rotating cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INTERESTS_DATA.map((item, index) => {
            const isHovered = hoverState.cardId === item.id;
            const rotX = isHovered ? hoverState.rotateX : 0;
            const rotY = isHovered ? hoverState.rotateY : 0;
            
            // Multi-direction entries with customized large slide amplitudes
            const variants: ("slide-right-xl" | "slide-up-xl" | "slide-left-xl")[] = [
              "slide-right-xl", // Sports: slides from left
              "slide-up-xl",    // Travel: slides from bottom
              "slide-left-xl"   // Technology: slides from right
            ];
            const cardVariant = variants[index % variants.length];
            
            return (
              <ScrollReveal key={item.id} variant={cardVariant} delay={index * 0.15} duration={0.85} className="h-full">
                <div
                  onMouseMove={(e) => handleMouseMove(e, item.id)}
                  onMouseLeave={handleMouseLeave}
                  className="relative h-[380px] rounded-2xl glass border border-white/5 overflow-hidden group cursor-pointer"
                  style={{
                    transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                    transition: isHovered ? "none" : "transform 0.5s ease-out",
                    transformStyle: "preserve-3d"
                  }}
                  id={`interest-card-${item.id}`}
                >
                {/* Spotlight shine glow layer */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-15"
                  style={{
                    background: `radial-gradient(180px circle at ${isHovered ? hoverState.spotlightX : 0}px ${isHovered ? hoverState.spotlightY : 0}px, rgba(255, 255, 255, 0.08), transparent 80%)`
                  }}
                />

                {/* Background rendering based on image availability */}
                {cardImages[item.id] && !imageErrors[item.id] ? (
                  <div className="absolute inset-0 overflow-hidden">
                    <img 
                      src={cardImages[item.id]} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={() => {
                        const currentSrc = cardImages[item.id];
                        if (currentSrc && currentSrc.endsWith(".png")) {
                          const fallbackSrc = currentSrc.replace(".png", ".jpg");
                          setCardImages(prev => ({
                            ...prev,
                            [item.id]: fallbackSrc
                          }));
                        } else {
                          setImageErrors(prev => ({ ...prev, [item.id]: true }));
                        }
                      }}
                      referrerPolicy="no-referrer"
                    />
                    {/* Multi-layered dark gradient protection for readable typography */}
                    <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent pointer-events-none" />
                    
                    {/* Tiny visual tech overlay indication on hover */}
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center select-none">
                      <UploadCloud className="w-6 h-6 text-cyber-cyan mb-2 animate-bounce" />
                      <span className="font-display font-bold text-xs text-white">Hình Ảnh Được Tải Lên</span>
                      <span className="font-mono text-[9px] text-gray-400 mt-1">
                        Thay thế ảnh này bất kỳ lúc nào tại {cardImages[item.id]}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Card Background gradient block */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-50 transition-all duration-350 ${getAccentBorder(item.id)}`} />

                    {/* Intersecting design visual wireframe */}
                    <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none" />

                    {/* Tech grid texture inside */}
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none" />

                    {/* Upload tip in fallback */}
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center z-15 select-none pointer-events-none">
                      <UploadCloud className="w-5 h-5 text-cyber-cyan mb-1.5 animate-bounce" />
                      <span className="font-display font-medium text-[11px] text-white">Cá Nhân Hóa Thầy Dũng</span>
                      <span className="font-mono text-[8px] text-gray-500 mt-1 max-w-[170px] leading-relaxed">
                        Kéo thả ảnh của bạn vào <span className="text-cyber-cyan font-bold block">{cardImages[item.id]}</span> để kích hoạt hình nền thực tế!
                      </span>
                    </div>
                  </>
                )}

                {/* Content block inside card */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  
                  {/* Top sector */}
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full font-bold tracking-widest uppercase">
                      <TextScramble text={item.category} />
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                      {getIcon(item.iconName)}
                    </div>
                  </div>

                  {/* Bottom sector */}
                  <div>
                    <h3 className={`font-display text-2xl font-extrabold tracking-wide mb-2 transition-all ${getGradientText(item.id)}`}>
                      <TextScramble text={item.title} />
                    </h3>
                    <p className="font-sans text-sm text-gray-350 leading-relaxed min-h-[48px]">
                      {item.description}
                    </p>

                    {/* Features checklist tags inside card */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {item.specs.map((spec, sIdx) => (
                        <span 
                          key={sIdx} 
                          className="font-mono text-[9px] text-gray-400 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 px-2 py-0.5 rounded transition-colors flex items-center gap-1"
                        >
                          <CheckCircle className="w-2.5 h-2.5 text-cyber-cyan" />
                          <TextScramble text={spec} />
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Corner futuristic tech bracket elements */}
                <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-white/10 group-hover:border-white/30 transition-colors" />
                <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-white/10 group-hover:border-white/30 transition-colors" />
                <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-white/10 group-hover:border-white/30 transition-colors" />
                <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-white/10 group-hover:border-white/30 transition-colors" />

              </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
