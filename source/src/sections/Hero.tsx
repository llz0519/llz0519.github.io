import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { WordsPullUp } from "@/components/WordsPullUp";
import { FadeUp } from "@/components/FadeUp";

interface HeroProps {
  onNavigate: (href: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onReady = () => setVideoReady(true);
    v.addEventListener("loadeddata", onReady);

    v.play().catch(() => {
      // autoplay blocked, CSS bg will show
    });

    return () => v.removeEventListener("loadeddata", onReady);
  }, []);

  return (
    <section className="relative h-screen">
      <div className="relative w-full h-full overflow-hidden">
        {/* ====== 背景层 1：纯色 + SVG 纹理（所有设备都支持） ====== */}
        <div className="absolute inset-0 z-0 bg-[#0f0e0c]">
          {/* 内联 SVG 噪点纹理 — 微信也支持 */}
          <svg
            className="absolute inset-0 w-full h-full opacity-30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <filter id="n">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#n)" />
          </svg>
          {/* 暖色光晕 — 用简单 div + opacity，不用 blur */}
          <div
            className="absolute w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(180,150,90,0.15) 0%, transparent 50%, rgba(140,110,60,0.1) 100%)",
            }}
          />
          {/* 顶部暖光 */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2"
            style={{
              background:
                "linear-gradient(180deg, rgba(200,170,100,0.12) 0%, transparent 70%)",
            }}
          />
          {/* 底部暗色 */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2"
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* ====== 背景层 2：视频（增强层） ====== */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          style={{
            opacity: videoReady ? 1 : 0,
            transition: "opacity 1.5s ease",
          }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* ====== 覆盖层 ====== */}
        <div className="noise-overlay absolute inset-0 opacity-[0.5] mix-blend-overlay pointer-events-none z-[2]" />
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* ====== 内容层 ====== */}
        <div className="absolute bottom-0 left-0 right-0 z-[3] p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="max-w-[1200px] mx-auto grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 lg:col-span-7">
              <FadeUp delay={0.6}>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="/assets/avatar.jpg"
                    alt="李林泽"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#DEDBC8]/20"
                  />
                  <p className="text-[clamp(10px,0.85vw,12px)] tracking-[0.08em] uppercase text-[#5C5A50]">
                    (00) HELLO — 李林泽
                  </p>
                </div>
              </FadeUp>
              <WordsPullUp
                text="Linze Li"
                showAsterisk
                className="text-[clamp(72px,14vw,240px)] font-extrabold leading-[0.85] tracking-[-0.06em] text-[#E1E0CC]"
                delay={0.8}
                tag="h1"
              />
            </div>

            <div className="col-span-12 lg:col-span-5 flex flex-col gap-5 pb-2 md:pb-4 mt-6 lg:mt-0">
              <FadeUp delay={1.4}>
                <p
                  className="text-[#9A9788] text-[clamp(13px,1.1vw,16px)] max-w-[400px]"
                  style={{ lineHeight: 1.7 }}
                >
                  太原理工大学软件工程本科在读，热爱工程实践与技术挑战。熟练掌握Python及主流大模型框架，具备完整的AI项目全流程开发经验。从医学图像分割到双Agent实时协作系统，关注系统性能与用户体验的平衡。
                </p>
              </FadeUp>

              <FadeUp delay={1.6} className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate("#projects")}
                  className="group flex items-center gap-2 hover:gap-3 transition-all duration-300 bg-[#DEDBC8] text-black font-semibold text-[clamp(11px,0.95vw,14px)] rounded-full pl-5 pr-1.5 py-1.5"
                >
                  <span>View My Work</span>
                  <span className="bg-black rounded-full w-7 h-7 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-[#DEDBC8]" />
                  </span>
                </button>
                <button
                  onClick={() => onNavigate("#about")}
                  className="flex items-center gap-2 bg-transparent border border-[#22221D] text-[#DEDBC8] font-medium text-[clamp(11px,0.95vw,14px)] rounded-full px-5 py-2 hover:border-[#C4A882] hover:text-[#C4A882] transition-colors duration-300"
                >
                  About Me
                </button>
              </FadeUp>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] hidden md:flex flex-col items-center gap-1"
        >
          <span className="text-[#5C5A50] text-[10px] tracking-widest uppercase">
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#5C5A50]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
