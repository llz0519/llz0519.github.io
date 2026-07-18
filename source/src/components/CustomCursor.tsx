import { useEffect, useRef, useCallback } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scale = useRef(1);
  const targetScale = useRef(1);
  const visible = useRef(false);
  const rafRef = useRef<number | null>(null);

  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  const animate = useCallback(() => {
    const lerp = 0.35;
    const scaleLerp = 0.2;

    pos.current.x += (pos.current.targetX - pos.current.x) * lerp;
    pos.current.y += (pos.current.targetY - pos.current.y) * lerp;
    scale.current += (targetScale.current - scale.current) * scaleLerp;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px) scale(${scale.current})`;
      cursorRef.current.style.opacity = visible.current ? "1" : "0";
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    document.body.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;
      if (!visible.current) {
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        visible.current = true;
      }
    };

    // Event delegation for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select'
      );
      if (interactive) {
        targetScale.current = 5;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select'
      );
      if (interactive) {
        targetScale.current = 1;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#C4A882] pointer-events-none z-[9999] mix-blend-difference"
      style={{ opacity: 0, willChange: "transform" }}
    />
  );
}
