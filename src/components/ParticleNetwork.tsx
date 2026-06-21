import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function ParticleNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // Handle Resize using ResizeObserver as instructed
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      
      // Debounce slightly or just update dimensions
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      
      setDimensions({
        width: Math.max(width, 320),
        height: Math.max(height, 240)
      });
    });

    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Neural network canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high-dpi support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Dynamic density of particles based on screen size
    const particleCount = Math.min(
      Math.floor((dimensions.width * dimensions.height) / 11000), 
      120
    );
    
    const particles: Particle[] = [];
    const colors = ["#06b6d4", "#a855f7", "#3b82f6", "#10b981"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Draw subtle grids background (Linear layout vibe)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < dimensions.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, dimensions.height);
        ctx.stroke();
      }
      for (let y = 0; y < dimensions.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(dimensions.width, y);
        ctx.stroke();
      }

      // Draw and connect particles
      particles.forEach((p, idx) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > dimensions.width) p.vx *= -1;
        if (p.y < 0 || p.y > dimensions.height) p.vy *= -1;

        // Clamp inside boundary just in case
        if (p.x < 0) p.x = 0;
        if (p.x > dimensions.width) p.x = dimensions.width;
        if (p.y < 0) p.y = 0;
        if (p.y > dimensions.height) p.y = dimensions.height;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = mouseRef.current.active ? 6 : 2;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Attraction to mouse
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 180) {
            // Gentle pull
            p.x += dx * 0.008;
            p.y += dy * 0.008;
          }
        }

        // Draw connections (neural lines)
        for (let j = idx + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 110) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            
            // Create a gradient for connected lines
            const grad = ctx.createLinearGradient(p.x, p.y, other.x, other.y);
            grad.addColorStop(0, p.color + Math.floor(alpha * 255).toString(16).padStart(2, "0"));
            grad.addColorStop(1, other.color + Math.floor(alpha * 255).toString(16).padStart(2, "0"));
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      // Ambient radial spotlight glow on mouse coordinates
      if (mouseRef.current.active) {
        ctx.beginPath();
        const radGrad = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 250
        );
        radGrad.addColorStop(0, "rgba(6, 182, 212, 0.07)");
        radGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.02)");
        radGrad.addColorStop(1, "transparent");
        ctx.fillStyle = radGrad;
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 250, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseEnter = () => {
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    // Attach event listeners to the window so it tracks mouse fluidly
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 w-full h-full overflow-hidden bg-dark-bg"
      style={{ minHeight: "100%" }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-auto opacity-75"
        style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
      />
    </div>
  );
}
