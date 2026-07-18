import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export function HorizontalScroll({
  children,
  className = "",
}: HorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.6;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm border border-[#22221D] flex items-center justify-center text-[#DEDBC8] opacity-0 group-hover:opacity-100 hover:border-[#C4A882] hover:text-[#C4A882] transition-all duration-300 hidden md:flex"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm border border-[#22221D] flex items-center justify-center text-[#DEDBC8] opacity-0 group-hover:opacity-100 hover:border-[#C4A882] hover:text-[#C4A882] transition-all duration-300 hidden md:flex"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Scroll container - with visible scrollbar on desktop */}
      <div
        ref={scrollRef}
        className="flex gap-[clamp(12px,1.5vw,20px)] overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#5C5A50 transparent",
        }}
      >
        {children}
      </div>
    </div>
  );
}
