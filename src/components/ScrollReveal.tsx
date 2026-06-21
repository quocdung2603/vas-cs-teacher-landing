import { motion } from "motion/react";
import { ReactNode } from "react";

interface ScrollRevealProps {
  key?: any;
  children: ReactNode;
  variant?: "fade-up" | "fade-down" | "slide-left" | "slide-right" | "zoom-in" | "scale-up" | "fade-in" | "slide-left-full" | "slide-left-large" | "slide-right-large" | "slide-up-large" | "slide-left-xl" | "slide-right-xl" | "slide-up-xl";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = false,
  className = "",
}: ScrollRevealProps) {
  const getVariants = () => {
    switch (variant) {
      case "fade-up":
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        };
      case "fade-down":
        return {
          hidden: { opacity: 0, y: -40 },
          visible: { opacity: 1, y: 0 },
        };
      case "slide-left":
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        };
      case "slide-left-full":
        return {
          hidden: { opacity: 0, x: "100vw" },
          visible: { opacity: 1, x: 0 },
        };
      case "slide-right":
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        };
      case "slide-left-large":
        return {
          hidden: { opacity: 0, x: 180 },
          visible: { opacity: 1, x: 0 },
        };
      case "slide-right-large":
        return {
          hidden: { opacity: 0, x: -180 },
          visible: { opacity: 1, x: 0 },
        };
      case "slide-up-large":
        return {
          hidden: { opacity: 0, y: 120 },
          visible: { opacity: 1, y: 0 },
        };
      case "slide-left-xl":
        return {
          hidden: { opacity: 0, x: 300 },
          visible: { opacity: 1, x: 0 },
        };
      case "slide-right-xl":
        return {
          hidden: { opacity: 0, x: -300 },
          visible: { opacity: 1, x: 0 },
        };
      case "slide-up-xl":
        return {
          hidden: { opacity: 0, y: 220 },
          visible: { opacity: 1, y: 0 },
        };
      case "zoom-in":
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 },
        };
      case "scale-up":
        return {
          hidden: { opacity: 0, scale: 0.95, y: 20 },
          visible: { opacity: 1, scale: 1, y: 0 },
        };
      case "fade-in":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      className={className}
    >
      <motion.div
        variants={getVariants()}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1], // Custom cubic bezier (easeOutExpo) for ultra smooth transition
        }}
        className="w-full h-full bg-transparent"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
