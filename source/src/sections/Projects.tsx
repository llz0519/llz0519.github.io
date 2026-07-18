import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { WordsPullUp } from "@/components/WordsPullUp";
import { FadeUp } from "@/components/FadeUp";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section
      id="projects"
      className="bg-[#0A0A0A] py-[clamp(80px,12vh,160px)] px-[clamp(20px,4vw,48px)]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Label */}
        <FadeUp>
          <p className="text-[clamp(10px,0.85vw,12px)] tracking-[0.08em] uppercase text-[#5C5A50] mb-6">
            (02) PROJECTS
          </p>
        </FadeUp>

        {/* Heading */}
        <WordsPullUp
          text="Selected work."
          className="text-[clamp(36px,5vw,72px)] font-bold text-[#DEDBC8] leading-[0.95] tracking-[-0.04em]"
          tag="h2"
        />

        {/* Description */}
        <FadeUp delay={0.2} className="mt-4 max-w-[520px]">
          <p
            className="text-[#9A9788] text-[clamp(13px,1.1vw,16px)]"
            style={{ lineHeight: 1.7 }}
          >
            从 AI 智能体到 Java 后端，从多模态检索到企业级应用。点击卡片查看项目详情。
          </p>
        </FadeUp>

        {/* Horizontal Scroll Cards — 无入场动画，避免滑动闪屏 */}
        <div className="mt-12 -mx-[clamp(20px,4vw,48px)] px-[clamp(20px,4vw,48px)]">
          <HorizontalScroll>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {/* Placeholder card */}
            <div className="snap-start flex-shrink-0 w-[clamp(280px,30vw,360px)] aspect-[4/3] rounded-2xl bg-[#0d0d0d] border border-dashed border-[#22221D] flex flex-col items-center justify-center p-6 text-center">
              <span className="text-[#5C5A50] text-[clamp(13px,1.1vw,16px)]">
                更多项目即将上线
              </span>
            </div>
          </HorizontalScroll>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof projects)[0];
}) {
  return (
    <div className="snap-start flex-shrink-0 w-[clamp(280px,30vw,360px)] aspect-[4/3]">
      <Link
        to={`/project/${project.id}`}
        className="group block w-full h-full bg-[#161616] rounded-2xl p-6 border border-transparent hover:border-[#C4A882]/30 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(196,168,130,0.06)] transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          <span className="text-[clamp(11px,0.9vw,13px)] text-[#5C5A50]">
            {project.index}
          </span>
          <h3 className="text-[clamp(16px,1.5vw,22px)] font-bold text-[#DEDBC8] mt-3 leading-tight">
            {project.title}
          </h3>
          <p className="text-[#9A9788] text-[clamp(12px,1vw,14px)] mt-2 line-clamp-2">
            {project.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[clamp(11px,0.95vw,14px)] text-[#C4A882] mt-4 group-hover:gap-2 transition-all">
          <span>查看详情</span>
          <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
        </div>
      </Link>
    </div>
  );
}
