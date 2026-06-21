import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function CyberBackground() {
  const [dots, setDots] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate static random positions for floating coding embers
    const tempDots = [];
    for (let i = 0; i < 28; i++) {
      tempDots.push({
        id: i,
        x: Math.random() * 100, // percentage
        y: Math.random() * 100, // percentage
        size: Math.random() * 2 + 1,
        delay: Math.random() * 10,
        duration: Math.random() * 20 + 20, // slow drifting
      });
    }
    setDots(tempDots);
  }, []);

  return (
    <div className="fixed inset-0 -z-20 w-full h-full overflow-hidden bg-dark-bg pointer-events-none">
      {/* Sci-Fi Dot Matrix Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(244,244,245,0.012)_1px,transparent_1.5px)] [background-size:32px_32px] opacity-150" />

      {/* Futuristic scanning wave lines running infinitely */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/[0.003] to-transparent h-[400px] w-full animate-[pulse_8s_infinite] pointer-events-none top-1/4" />

      {/* Cyberpunk ambient glowing nebulas / blobs moving super slowly */}
      <motion.div
        animate={{
          x: [0, 80, -50, 0],
          y: [0, -120, 60, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-cyber-cyan/3 blur-[120px] mix-blend-screen pointer-events-none"
      />

      <motion.div
        animate={{
          x: [0, -60, 90, 0],
          y: [0, 100, -80, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-cyber-purple/3 blur-[140px] mix-blend-screen pointer-events-none"
      />

      <motion.div
        animate={{
          x: [0, 40, -40, 0],
          y: [0, 80, -100, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-2/3 left-10 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-cyber-blue/2 blur-[100px] mix-blend-screen pointer-events-none"
      />

      {/* Floating Micro-Embers / Digital dust particles */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-cyber-cyan/15 shadow-[0_0_8px_rgba(6,182,212,0.3)] pointer-events-none"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            y: ["0%", "-100%"],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
