import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface AnimatedLetterProps {
  text: string;
  className?: string;
}

export function AnimatedLetter({ text, className = "" }: AnimatedLetterProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");
  const totalChars = chars.length;

  return (
    <p ref={containerRef} className={className}>
      {chars.map((char, index) => {
        const charProgress = index / totalChars;
        const startRange = Math.max(0, charProgress - 0.1);
        const endRange = Math.min(1, charProgress + 0.05);

        return (
          <AnimatedChar
            key={index}
            char={char}
            scrollYProgress={scrollYProgress}
            startRange={startRange}
            endRange={endRange}
          />
        );
      })}
    </p>
  );
}

interface AnimatedCharProps {
  char: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  startRange: number;
  endRange: number;
}

function AnimatedChar({
  char,
  scrollYProgress,
  startRange,
  endRange,
}: AnimatedCharProps) {
  const opacity = useTransform(
    scrollYProgress,
    [startRange, endRange],
    [0.2, 1]
  );

  return (
    <motion.span style={{ opacity }} className="inline">
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}
