import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  containerClassName?: string;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export function WordsPullUpMultiStyle({
  segments,
  containerClassName = "",
  delay = 0,
  tag: Tag = "div",
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const allWords: { word: string; className: string; globalIndex: number }[] = [];
  let globalIndex = 0;

  segments.forEach((segment) => {
    const words = segment.text.split(" ");
    words.forEach((word) => {
      allWords.push({
        word,
        className: segment.className || "",
        globalIndex,
      });
      globalIndex++;
    });
  });

  return (
    <Tag
      ref={ref as any}
      className={`inline-flex flex-wrap justify-center ${containerClassName}`}
    >
      {allWords.map((item, i) => (
        <span key={i} className="inline-flex items-start overflow-hidden">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block ${item.className}`}
          >
            {item.word}
          </motion.span>
          {i < allWords.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
