import { useState } from "react";
import { motion } from "motion/react";
import { Brain, Terminal, Bot, Laptop, Cloud, Code2, Sparkles, Shield, Compass, UploadCloud } from "lucide-react";
import Counter from "./Counter";
import { FLOATING_ICONS } from "../data";
import ScrollReveal from "./ScrollReveal";
import TextScramble from "./TextScramble";
import TextStream from "./TextStream";

export default function WhoAmI() {
  const [avatarError, setAvatarError] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("/assets/avatar_professional.png");

  const getIcon = (name: string) => {
    switch (name) {
      case "Brain": return <Brain className="w-5 h-5 text-purple-400" />;
      case "Terminal": return <Terminal className="w-5 h-5 text-cyan-400" />;
      case "Bot": return <Bot className="w-5 h-5 text-emerald-400" />;
      case "Cpu": return <Shield className="w-5 h-5 text-amber-400" />;
      case "Cloud": return <Cloud className="w-5 h-5 text-blue-400" />;
      case "Code2": return <Code2 className="w-5 h-5 text-pink-400" />;
      default: return <Compass className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <section id="who-am-i" className="relative py-24 sm:py-32 overflow-hidden bg-slate-950/40">
      
      {/* Decorative cyber grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Glowing ambient blobs */}
      <div className="absolute top-1/4 left-0 w-[350px] h-[350px] rounded-full bg-cyber-purple/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] rounded-full bg-cyber-cyan/15 blur-[120px] pointer-events-none" />

      {/* Floating interactive technology icons around the section (Background layer) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {FLOATING_ICONS.map((item, idx) => (
          <div
            key={idx}
            className={`absolute hidden md:flex flex-col items-center p-3 rounded-2xl glass shadow-lg border border-white/5 backdrop-blur-md transition-all duration-300 pointer-events-auto hover:border-cyber-cyan/40 hover:scale-110`}
            style={{
              left: item.x,
              top: item.y,
              animation: `float ${6 + item.delay}s ease-in-out infinite`,
              animationDelay: `${item.delay}s`
            }}
          >
            <div className="p-2.5 rounded-xl bg-slate-900/80 mb-1.5 flex items-center justify-center">
              {getIcon(item.icon)}
            </div>
            <span className="font-mono text-[10px] text-gray-400 font-semibold tracking-wider uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section title */}
        <ScrollReveal variant="slide-up-xl" duration={0.8}>
          <div className="text-center mb-16 md:mb-24">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20 uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Về người hướng dẫn
            </span>
            <h2 className="font-display text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white">
              <TextScramble text="Tôi Là Ai?" /> <span className="text-gradient-purple-cyan">/ <TextScramble text="Who Am I" /></span>
            </h2>
            <div className="h-[2px] w-16 bg-gradient-to-r from-cyber-purple to-cyber-cyan mx-auto mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Avatar Section (Left) */}
          <ScrollReveal variant="slide-right-xl" duration={0.95} className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-72 h-72 sm:w-85 sm:h-85">
              
              {/* Complex technological background layers */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyber-cyan via-cyber-purple to-cyber-blue rounded-full opacity-20 blur-2xl animate-pulse" />
              
              {/* Orbit rotation rings */}
              <div className="absolute -inset-4 rounded-full border border-dashed border-white/10 animate-[spin_40s_linear_infinite]" />
              <div className="absolute -inset-8 rounded-full border border-double border-white/5 animate-[spin_25s_linear_infinite_reverse]" />
              
              {/* Outer Cyan visual compass */}
              <div className="absolute inset-0 rounded-full border-2 border-cyber-cyan/10 flex items-center justify-center">
                <div className="w-[96%] h-[96%] rounded-full border border-white/5 bg-slate-950 flex items-center justify-center overflow-hidden relative group">
                  
                  {/* Condition to show upload photo or original dashboard fallback */}
                  {!avatarError ? (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-950">
                      <img
                        src={avatarSrc}
                        alt="Nguyễn Quốc Dũng"
                        className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                        onError={() => {
                          if (avatarSrc.endsWith(".png")) {
                            setAvatarSrc("/assets/avatar_professional.jpg");
                          } else {
                            setAvatarError(true);
                          }
                        }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 pointer-events-none" />
                      
                      {/* Name badge overlay for loaded photo */}
                      <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 border border-white/5 backdrop-blur-md py-1.5 px-3 rounded-xl flex flex-col items-center">
                        <span className="font-display font-bold text-xs text-white">Nguyễn Quốc Dũng</span>
                        <span className="font-mono text-[8px] text-cyber-cyan uppercase tracking-widest mt-0.5">Viet Anh 3 Teacher</span>
                      </div>

                      {/* Info overlay on hover */}
                      <div className="absolute inset-y-0 inset-x-0 bg-slate-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                        <UploadCloud className="w-5 h-5 text-cyber-cyan mb-2 animate-bounce" />
                        <span className="font-display text-xs text-white font-bold">Hình Nền Giáo Viên</span>
                        <span className="font-mono text-[9px] text-gray-400 mt-1 max-w-[150px] leading-normal">
                          Bạn có thể thay thế ảnh này bằng cách tải tệp lên /assets/avatar_professional.png hoặc .jpg
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Decorative digital circuit canvas */}
                      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                      {/* High fidelity pure CSS tech representation face */}
                      <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
                        
                        {/* Glowing digital brain interface wrapper */}
                        <div className="relative mb-4 animate-float-slow">
                          <div className="absolute -inset-4 rounded-full bg-cyber-cyan/20 blur-xl opacity-75" />
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyber-cyan to-cyber-purple p-[1px] flex items-center justify-center">
                            <div className="w-full h-full bg-slate-900 rounded-[15px] flex items-center justify-center">
                              <Bot className="w-10 h-10 text-white animate-pulse" />
                            </div>
                          </div>
                        </div>

                        {/* Meta tag label info */}
                        <span className="font-mono text-[10px] uppercase font-bold text-cyber-cyan tracking-widest bg-cyber-cyan/10 border border-cyber-cyan/25 px-2.5 py-0.5 rounded-full mb-1">
                          TEACHER AT VIET ANH 3
                        </span>
                        <h3 className="font-display font-bold text-lg text-white tracking-wide">
                          Nguyễn Quốc Dũng
                        </h3>
                        <p className="font-mono text-[9px] text-gray-400 mt-1 uppercase tracking-wider">
                          Sys.admin & Tin học Sư phạm
                        </p>

                        {/* Orbit lines surrounding tech face */}
                        <div className="absolute bottom-4 left-4 right-4 py-1.5 px-3 rounded-lg bg-white/[0.02] border border-white/5">
                          <p className="font-mono text-[9px] text-gray-400 text-center">
                            Status: <span className="text-emerald-400 font-bold">ONLINE</span> • Age: <span className="text-white">24</span>
                          </p>
                        </div>

                        {/* Drag and Drop notice in fallback */}
                        <div className="absolute inset-y-0 inset-x-0 bg-slate-950/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                          <UploadCloud className="w-6 h-6 text-cyber-cyan mb-2 animate-bounce" />
                          <p className="font-display text-xs text-white font-bold">Công nghệ Hình Ảnh Thực Tế</p>
                          <p className="font-mono text-[9px] text-gray-400 mt-2 leading-relaxed">
                            Kéo thả ảnh chân dung của thầy dũng vào <span className="text-cyber-cyan font-bold block mt-1">/assets/avatar_professional.jpg</span> để hiển thị tại đây!
                          </p>
                        </div>

                      </div>
                    </>
                  )}

                </div>
              </div>

              {/* Glowing decorative radar dot nodes surrounding */}
              <div className="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-cyber-cyan glow-cyan animate-ping" />
              <div className="absolute bottom-8 right-6 w-3.5 h-3.5 rounded-full bg-cyber-purple glow-purple animate-ping [animation-delay:1s]" />
            </div>
          </ScrollReveal>

          {/* Teacher Intro Text Section (Right) */}
          <ScrollReveal variant="slide-left-xl" delay={0.15} duration={0.95} className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            
            <div className="space-y-4">
              <span className="font-mono text-sm font-bold text-cyber-cyan leading-none tracking-widest uppercase block">
                <TextStream text="XIN CHÀO CÁC EM! 👋" mode="char" speed={60} />
              </span>
              <h3 className="font-display font-medium text-2xl sm:text-3.5xl text-white leading-tight">
                <TextStream text="Thầy là " mode="char" speed={50} delay={600} />
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-gray-400">
                  <TextStream text="Nguyễn Quốc Dũng" mode="char" speed={60} delay={1100} />
                </span>
                <TextStream text=", " mode="char" speed={50} delay={2000} />
                <span className="text-cyber-cyan font-semibold">
                  <TextStream text="24 tuổi" mode="char" speed={70} delay={2200} />
                </span>
                <TextStream text="." mode="char" speed={50} delay={2700} />
              </h3>
            </div>

            <div className="text-gray-300 text-base sm:text-lg leading-relaxed font-sans min-h-[110px]">
              <TextStream 
                text="Hiện đang là giáo viên dạy học Tin học tại Trung Tiểu Học Việt Anh 3. Với lòng nhiệt huyết tuổi trẻ cùng đam mê bất tận với Công nghệ Thông tin, thầy luôn nỗ lực thực hành những phương pháp giảng dạy sáng tạo nhất." 
                mode="word" 
                speed={50} 
                delay={3000} 
              />
            </div>

            {/* Glowing quote segment requested: "Thầy tin rằng công nghệ không chỉ là công cụ,..." */}
            <motion.div 
              className="relative p-5 sm:p-6 rounded-2xl glass bg-gradient-to-r from-cyber-cyan/5 via-slate-900/40 to-transparent border-l-4 border-l-cyber-cyan glow-cyan"
              animate={{
                scale: [1, 1.025, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="absolute -top-3 -left-1 text-4xl text-cyber-cyan/20 select-none font-serif font-bold">“</span>
              <p className="font-display font-semibold text-white text-base sm:text-lg leading-relaxed relative z-10 italic">
                Thầy tin rằng công nghệ không chỉ là công cụ, mà còn là cánh cửa diệu kỳ giúp chúng ta mở ra tư duy, khám phá những điều mới mẻ mỗi ngày.
              </p>
            </motion.div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-3 gap-4 pt-4 font-mono">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center hover:border-white/10 transition-colors">
                <span className="block text-xl sm:text-2xl font-bold text-cyber-cyan">
                  <Counter end={24} suffix="" />
                </span>
                <span className="block text-[10px] text-gray-400 uppercase tracking-wider mt-1">
                  <TextScramble text="TUỔI ĐỜI" />
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center hover:border-white/10 transition-colors">
                <span className="block text-xl sm:text-2xl font-bold text-cyber-purple">
                  <Counter end={100} suffix="%" />
                </span>
                <span className="block text-[10px] text-gray-400 uppercase tracking-wider mt-1">
                  <TextScramble text="NHIỆT HUYẾT" />
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center hover:border-white/10 transition-colors">
                <span className="block text-xl sm:text-2xl font-bold text-cyber-blue">
                  <Counter end={24} prefix="7/" />
                </span>
                <span className="block text-[10px] text-gray-400 uppercase tracking-wider mt-1">
                  <TextScramble text="HỖ TRỢ HỌC" />
                </span>
              </div>
            </div>

          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
