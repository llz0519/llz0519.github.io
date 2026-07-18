import { useCallback } from "react";
import Lenis from "lenis";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Writing } from "@/sections/Writing";
import { Life } from "@/sections/Life";
import { Footer } from "@/sections/Footer";

interface HomeProps {
  lenisRef: React.MutableRefObject<Lenis | null>;
}

export function Home({ lenisRef }: HomeProps) {
  const handleNavigate = useCallback(
    (href: string) => {
      if (href === "#") {
        lenisRef.current?.scrollTo(0, { duration: 1.5 });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        lenisRef.current?.scrollTo(target as HTMLElement, {
          offset: -60,
          duration: 1.5,
        });
      }
    },
    [lenisRef]
  );

  return (
    <div className="bg-black min-h-screen">
      <Hero onNavigate={handleNavigate} />
      <About />
      <Projects />
      <Writing />
      <Life />
      <Footer />
    </div>
  );
}
