import { useState, useEffect, useRef } from "react";

interface TextScrambleProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnHover?: boolean;
}

export default function TextScramble({
  text,
  delay = 0,
  duration = 1000,
  className = "",
  triggerOnHover = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const triggerRef = useRef<boolean>(false);
  const hoverTriggerRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$£_%§&;[]{}<>";

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let frame = 0;
    const totalFrames = Math.floor(duration / 30); // 30ms per frame update
    const textLength = text.length;
    const intervalTime = 30;

    const interval = setInterval(() => {
      frame++;
      
      const progress = frame / totalFrames;
      const progressChars = Math.floor(progress * textLength);

      const nextText = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < progressChars) {
            return text[index];
          }
          if (Math.random() < 0.28) {
            return chars[Math.floor(Math.random() * chars.length)];
          }
          return displayText[index] || char;
        })
        .join("");

      setDisplayText(nextText);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, intervalTime);
  };

  // Intersection Observer to trigger on scroll reveal (resetting when leaving viewport)
  useEffect(() => {
    if (!containerRef.current) return;

    let delayTimeout: any = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!triggerRef.current) {
              triggerRef.current = true;
              delayTimeout = setTimeout(() => {
                scramble();
              }, delay);
            }
          } else {
            // Reset when leaving viewport (for in-and-out experience)
            triggerRef.current = false;
            if (delayTimeout) {
              clearTimeout(delayTimeout);
              delayTimeout = null;
            }
            setIsScrambling(false);
            setDisplayText(text);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (delayTimeout) clearTimeout(delayTimeout);
    };
  }, [text, delay]);

  const handleMouseEnter = () => {
    if (triggerOnHover && !isScrambling) {
      scramble();
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block select-all cursor-default ${className}`}
    >
      {displayText}
    </span>
  );
}
