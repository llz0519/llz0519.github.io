import { Github, Mail } from "lucide-react";
import { WordsPullUp } from "@/components/WordsPullUp";
import { FadeUp } from "@/components/FadeUp";

export function Footer() {
  return (
    <footer className="bg-black border-t border-[#22221D] py-[clamp(80px,12vh,160px)] px-[clamp(20px,4vw,48px)]">
      <div className="max-w-[1200px] mx-auto">
        {/* CTA Area */}
        <div className="text-center py-12">
          <WordsPullUp
            text="Let's build something together."
            className="text-[clamp(36px,5vw,72px)] font-bold text-[#DEDBC8] leading-[0.95] tracking-[-0.04em]"
            tag="h2"
          />
          <FadeUp delay={0.3} className="mt-3">
            <p
              className="text-[#9A9788] text-[clamp(13px,1.1vw,16px)] max-w-[480px] mx-auto"
              style={{ lineHeight: 1.7 }}
            >
              太原理工大学软件工程本科在读，可实习六个月以上。热爱工程实践与技术挑战，期待与志同道合的伙伴一起创造有价值的产品。
            </p>
          </FadeUp>
          <FadeUp delay={0.5} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:2890330684@qq.com"
              className="flex items-center gap-2 text-[clamp(16px,1.5vw,22px)] text-[#C4A882] hover:underline font-normal"
            >
              <Mail className="w-5 h-5" />
              <span>2890330684@qq.com</span>
            </a>
            <span className="text-[#5C5A50] hidden sm:inline">|</span>
            <a
              href="tel:17200638190"
              className="text-[clamp(14px,1.2vw,18px)] text-[#9A9788] hover:text-[#C4A882] transition-colors"
            >
              17200638190
            </a>
          </FadeUp>
        </div>

        {/* Social Links */}
        <FadeUp delay={0.6} className="flex justify-center gap-6 mt-10">
          <a
            href="https://github.com/llz0519"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-10 h-10 rounded-full border border-[#22221D] flex items-center justify-center text-[#9A9788] hover:border-[#C4A882] hover:text-[#C4A882] hover:-translate-y-0.5 transition-all duration-300"
          >
            <Github size={18} />
          </a>
          <a
            href="mailto:2890330684@qq.com"
            aria-label="Email"
            className="w-10 h-10 rounded-full border border-[#22221D] flex items-center justify-center text-[#9A9788] hover:border-[#C4A882] hover:text-[#C4A882] hover:-translate-y-0.5 transition-all duration-300"
          >
            <Mail size={18} />
          </a>
        </FadeUp>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#22221D] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[clamp(10px,0.85vw,12px)] text-[#5C5A50]">
            &copy; 2026 Linze Li (李林泽). All rights reserved.
          </p>
          <p className="text-[clamp(10px,0.85vw,12px)] text-[#5C5A50]">
            Designed &amp; Built with curiosity
          </p>
        </div>
      </div>
    </footer>
  );
}
