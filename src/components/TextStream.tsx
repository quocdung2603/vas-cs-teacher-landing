import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface TextStreamProps {
  text: string;
  delay?: number;
  speed?: number; // output speed factor
  className?: string;
  mode?: "word" | "char" | "line";
}

export default function TextStream({
  text,
  delay = 0,
  speed = 40, // standard typing speed (in ms per unit)
  className = "",
  mode = "char"
}: TextStreamProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let delayTimeout: any = null;
    let streamCleanup: (() => void) | null = null;

    const startStreaming = () => {
      const normalizedText = text.normalize("NFC");
      if (mode === "char") {
        const chars = Array.from(normalizedText);
        let index = 0;
        const interval = setInterval(() => {
          setDisplayedText(chars.slice(0, index + 1).join(""));
          index++;
          if (index >= chars.length) {
            clearInterval(interval);
            setIsComplete(true);
          }
        }, speed);
        return () => clearInterval(interval);
      } else if (mode === "word") {
        const words = normalizedText.split(" ");
        let index = 0;
        const interval = setInterval(() => {
          setDisplayedText(words.slice(0, index + 1).join(" "));
          index++;
          if (index >= words.length) {
            clearInterval(interval);
            setIsComplete(true);
          }
        }, speed * 2);
        return () => clearInterval(interval);
      } else {
        // Line-by-line streaming
        const lines = normalizedText.split(". ");
        let index = 0;
        const interval = setInterval(() => {
          setDisplayedText(lines.slice(0, index + 1).join(". "));
          index++;
          if (index >= lines.length) {
            clearInterval(interval);
            setIsComplete(true);
          }
        }, speed * 8);
        return () => clearInterval(interval);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!triggerRef.current) {
              triggerRef.current = true;
              delayTimeout = setTimeout(() => {
                streamCleanup = startStreaming();
              }, delay);
            }
          } else {
            // Out of view: reset trigger, clear tasks, clear displayed text
            triggerRef.current = false;
            if (delayTimeout) {
              clearTimeout(delayTimeout);
              delayTimeout = null;
            }
            if (streamCleanup) {
              streamCleanup();
              streamCleanup = null;
            }
            setDisplayedText("");
            setIsComplete(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (delayTimeout) clearTimeout(delayTimeout);
      if (streamCleanup) streamCleanup();
    };
  }, [text, delay, speed, mode]);

  return (
    <span ref={containerRef} className={className}>
      {displayedText}
      {!isComplete && (
        <span className="inline-block w-1.5 h-4 ml-0.5 bg-cyber-cyan animate-pulse animate-[pulse_1s_infinite]" />
      )}
    </span>
  );
}
