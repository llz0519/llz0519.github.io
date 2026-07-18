import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export function WordsPullUp({
  text,
  className = "",
  showAsterisk = false,
  delay = 0,
  tag: Tag = "div",
}: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = text.split(" ");

  return (
    <Tag ref={ref as any} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1;
        return (
          <span key={i} className="inline-flex items-start overflow-hidden">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: delay + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block relative"
            >
              {word}
              {showAsterisk && isLastWord && (
                <sup
                  className="absolute text-[0.15em] font-normal"
                  style={{ top: "0.08em", right: "-0.35em" }}
                >
                  *
                </sup>
              )}
            </motion.span>
            {i < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </Tag>
  );
}
