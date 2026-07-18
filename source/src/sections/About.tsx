import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { WordsPullUpMultiStyle } from "@/components/WordsPullUpMultiStyle";
import { AnimatedLetter } from "@/components/AnimatedLetter";
import { FadeUp } from "@/components/FadeUp";

function useCountUp(
  end: number,
  inView: boolean,
  duration: number = 1500
) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, end, duration]);

  return count;
}

function StatBlock({
  end,
  label,
  inView,
  suffix = "",
}: {
  end: number;
  label: string;
  inView: boolean;
  suffix?: string;
}) {
  const count = useCountUp(end, inView);

  return (
    <FadeUp className="text-center">
      <div className="text-[clamp(36px,5vw,72px)] font-extrabold text-[#DEDBC8] leading-none tracking-[-0.04em]">
        {suffix === "∞" ? "∞" : count + suffix}+
      </div>
      <div className="text-[clamp(11px,0.9vw,13px)] text-[#5C5A50] mt-1 tracking-[0.02em]">
        {label}
      </div>
    </FadeUp>
  );
}

export function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="bg-black py-[clamp(80px,12vh,160px)] px-[clamp(20px,4vw,48px)]"
    >
      <div className="max-w-[800px] mx-auto text-center">
        {/* Section Label */}
        <FadeUp>
          <p className="text-[clamp(10px,0.85vw,12px)] tracking-[0.08em] uppercase text-[#5C5A50] mb-6">
            (01) ABOUT
          </p>
        </FadeUp>

        {/* Multi-Style Heading */}
        <WordsPullUpMultiStyle
          segments={[
            {
              text: "我叫李林泽，",
              className: "font-normal",
            },
            {
              text: "太原理工大学软件工程在读。",
              className: "font-normal",
            },
            {
              text: "主修深度学习、计算机组成原理、操作系统、",
              className: "font-normal",
            },
            {
              text: "面向对象程序设计与计算机网络。",
              className: "font-normal",
            },
            {
              text: "一个相信好代码胜过新代码的工程师。",
              className: "font-normal",
            },
          ]}
          containerClassName="text-[clamp(16px,2vw,26px)] max-w-[640px] mx-auto leading-[1.3] text-[#DEDBC8]"
        />

        {/* Bio Text with scroll-linked opacity */}
        <div className="mt-12 max-w-[600px] mx-auto">
          <AnimatedLetter
            text="我对 Agent 记忆机制、AI Infra 和 World Model 充满好奇，也关注大模型轻量化微调与离线部署。比起追逐最新的技术热点，我更在意代码的可维护性、系统的稳定性和产品的真实体验。相信好的软件是迭代出来的，不是堆出来的。"
            className="text-[#9A9788] text-[clamp(14px,1.2vw,18px)] leading-[1.7] text-center"
          />
        </div>

        {/* Education & Research */}
        <div className="mt-14 text-left">
          <FadeUp>
            <div className="bg-[#0A0A0A] rounded-2xl p-6 md:p-8 border border-[#22221D]">
              {/* Education */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-[#DEDBC8] text-[clamp(15px,1.4vw,20px)] font-bold">
                    太原理工大学
                  </h3>
                  <p className="text-[#9A9788] text-[clamp(12px,1vw,14px)] mt-0.5">
                    软件工程 本科
                  </p>
                </div>
                <span className="text-[#5C5A50] text-[clamp(11px,0.9vw,13px)] whitespace-nowrap">
                  2023.09 - 2027.06
                </span>
              </div>

              {/* Research */}
              <div className="space-y-4 border-t border-[#22221D] pt-6">
                <h4 className="text-[#C4A882] text-[clamp(11px,0.95vw,14px)] font-semibold tracking-wide uppercase">
                  科研经历
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-[#DEDBC8] text-[clamp(12px,1vw,14px)] font-medium">
                      太原理工大学人工智能课题组 | 科研助理
                    </p>
                    <p className="text-[#9A9788] text-[clamp(12px,1vw,14px)] mt-1 leading-relaxed">
                      调研U-Net、SAM等主流模型，针对特定病灶识别瓶颈，尝试引入注意力机制进行模型优化；协助导师完成实验数据的预处理与结果对比分析，验证改进方案的有效性。
                    </p>
                  </div>
                  <div>
                    <p className="text-[#DEDBC8] text-[clamp(12px,1vw,14px)] font-medium">
                      中国科学院大学 | AI Agent与具身智能实践
                    </p>
                    <p className="text-[#9A9788] text-[clamp(12px,1vw,14px)] mt-1 leading-relaxed">
                      通过多项实践课题探索AI Agent在自动化办公、长期记忆管理等场景的应用；在Webots仿真环境下复现了机械臂抓取与避障导航算法，初步掌握了具身智能端到端控制的基本流程。
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mt-6 pt-6 border-t border-[#22221D]">
                <h4 className="text-[#C4A882] text-[clamp(11px,0.95vw,14px)] font-semibold tracking-wide uppercase mb-3">
                  核心技能
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python",
                    "LangChain",
                    "LangGraph",
                    "FastAPI",
                    "RAG",
                    "Agent",
                    "React",
                    "Vue3",
                    "Docker",
                    "Kafka",
                    "Milvus",
                    "Claude Code",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="text-[clamp(10px,0.85vw,12px)] text-[#9A9788] bg-[#161616] px-3 py-1 rounded-full border border-[#22221D]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-16 flex flex-wrap justify-center gap-[clamp(32px,5vw,80px)]"
        >
          <StatBlock end={3} label="Years Coding" inView={statsInView} />
          <StatBlock end={2} label="Research Projects" inView={statsInView} />
          <div className="text-center">
            <FadeUp>
              <div className="text-[clamp(36px,5vw,72px)] font-extrabold text-[#DEDBC8] leading-none tracking-[-0.04em]">
                ∞
              </div>
              <div className="text-[clamp(11px,0.9vw,13px)] text-[#5C5A50] mt-1 tracking-[0.02em]">
                Curiosity
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
