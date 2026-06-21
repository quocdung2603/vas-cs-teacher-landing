import { useEffect, useRef, useState } from "react";
import { Sparkles, Terminal, Rocket, Github } from "lucide-react";
import { motion } from "motion/react";
import ScrollReveal from "./ScrollReveal";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}

export default function MotivationalStars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      setDimensions({
        width: Math.max(width, 320),
        height: Math.max(height, 350)
      });
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    const stars: Star[] = [];
    const starCount = 140;
    const colors = ["#ffffff", "#06b6d4", "#a855f7", "#3b82f6"];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * dimensions.width - dimensions.width / 2,
        y: Math.random() * dimensions.height - dimensions.height / 2,
        z: Math.random() * dimensions.width,
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let animId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(3, 7, 18, 0.25)"; // fade tail trial
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;

      // Draw cyber radial background helper
      ctx.beginPath();
      const grad = ctx.createRadialGradient(cx, cy, 50, cx, cy, dimensions.width / 2);
      grad.addColorStop(0, "rgba(168, 85, 247, 0.05)");
      grad.addColorStop(0.5, "rgba(6, 182, 212, 0.01)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.arc(cx, cy, dimensions.width, 0, Math.PI * 2);
      ctx.fill();

      // Render star hyperspace jump zoom
      stars.forEach((star) => {
        star.z -= 0.85; // move closer

        if (star.z <= 0) {
          star.z = dimensions.width;
          star.x = Math.random() * dimensions.width - cx;
          star.y = Math.random() * dimensions.height - cy;
        }

        const px = (star.x / star.z) * cx * 1.5 + cx;
        const py = (star.y / star.z) * cy * 1.5 + cy;

        // Verify inside screen
        if (px >= 0 && px <= dimensions.width && py >= 0 && py <= dimensions.height) {
          const dSize = (1 - star.z / dimensions.width) * star.size * 2.5;
          ctx.beginPath();
          ctx.arc(px, py, Math.max(dSize, 0.4), 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.shadowColor = star.color;
          ctx.shadowBlur = dSize > 1.5 ? 4 : 0;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw ambient code orbits representational wires
      ctx.strokeStyle = "rgba(6, 182, 212, 0.04)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(168, 85, 247, 0.03)";
      ctx.beginPath();
      ctx.arc(cx, cy, 260, 0, Math.PI * 2);
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [dimensions]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center overflow-hidden bg-dark-bg py-24 px-4 sm:px-6 lg:px-8 border-y border-white/5"
    >
      {/* Absolute Canvas Background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
      />

      {/* Futuristic floating grid braces overlay */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

      {/* Decorative technical matrix brackets */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-800 font-display text-[150px] leading-none opacity-20 hidden md:block select-none pointer-events-none font-bold">
        &#123;
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-800 font-display text-[150px] leading-none opacity-20 hidden md:block select-none pointer-events-none font-bold">
        &#125;
      </div>

      <ScrollReveal variant="zoom-in" className="max-w-4xl mx-auto text-center relative z-10 space-y-8 select-text">
        
        {/* Sparkle node bar */}
        <div className="flex justify-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse" />
            <span className="font-mono text-[10.5px] uppercase tracking-widest text-gray-400">
              The Future Starts Today
            </span>
          </div>
        </div>

        {/* Motivational quote in big typography */}
        <div className="space-y-6">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.88, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display font-extrabold text-2.5xl sm:text-5xl leading-[1.2] text-white tracking-tight"
          >
            “ Có thể hôm nay các em <span className="text-gradient-purple-cyan underline decoration-cyan-500/30 decoration-wavy underline-offset-8">chưa biết lập trình</span>.
            <span className="block mt-4">
              Nhưng biết đâu vài năm nữa,
            </span>
            <span className="block mt-4 text-gradient-cyan-blue">
              các em sẽ tạo ra những sản phẩm thay đổi thế giới. ”
            </span>
          </motion.h2>
        </div>

        <div className="pt-6 flex justify-center gap-4">
          <div className="flex items-center space-x-4 text-xs font-mono text-gray-500">
            <span className="flex items-center gap-1.5 bg-slate-900/60 p-2 border border-white/5 rounded-xl">
              <Terminal className="w-4 h-4 text-cyber-cyan" />
              <span>let future = true;</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/60 p-2 border border-white/5 rounded-xl">
              <Rocket className="w-4 h-4 text-cyber-purple" />
              <span>future.launch()</span>
            </span>
          </div>
        </div>

      </ScrollReveal>
    </section>
  );
}
