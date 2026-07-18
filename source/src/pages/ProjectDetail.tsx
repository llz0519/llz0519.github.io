import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjectById } from "@/data/projects";
import { FadeUp } from "@/components/FadeUp";

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = getProjectById(id || "");

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#DEDBC8] text-xl mb-4">Project not found</p>
          <Link
            to="/"
            className="text-[#C4A882] hover:underline text-sm"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed back button - uses browser back to preserve scroll position */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-[#22221D] text-[#DEDBC8] hover:border-[#C4A882] hover:text-[#C4A882] transition-all duration-300"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Hero area */}
      <div className="relative h-[50vh] min-h-[300px] max-h-[500px] rounded-b-[2rem] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1a1510 0%, #0f0d0a 50%, #1a1814 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(196,168,130,0.2) 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 z-10">
          <div className="max-w-[1200px] mx-auto">
            <span className="text-[clamp(10px,0.85vw,12px)] tracking-[0.08em] uppercase text-[#C4A882]">
              Project {project.index}
            </span>
            <h1 className="text-[clamp(28px,4vw,56px)] font-bold text-[#DEDBC8] leading-[0.95] tracking-[-0.04em] mt-2">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-[clamp(20px,4vw,48px)] py-[clamp(48px,8vh,96px)]">
        {/* Description */}
        <FadeUp>
          <p
            className="text-[#9A9788] text-[clamp(14px,1.2vw,18px)]"
            style={{ lineHeight: 1.8 }}
          >
            {project.description}
          </p>
        </FadeUp>

        {/* Tech stack */}
        <FadeUp delay={0.1} className="mt-8">
          <h2 className="text-[clamp(10px,0.85vw,12px)] tracking-[0.08em] uppercase text-[#5C5A50] mb-3">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[clamp(11px,0.95vw,14px)] text-[#DEDBC8] bg-[#161616] border border-[#22221D] px-4 py-1.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </FadeUp>

        {/* Key features */}
        <FadeUp delay={0.2} className="mt-10">
          <h2 className="text-[clamp(10px,0.85vw,12px)] tracking-[0.08em] uppercase text-[#5C5A50] mb-4">
            Key Features
          </h2>
          <ul className="space-y-3">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4A882] mt-2 flex-shrink-0" />
                <span className="text-[#9A9788] text-[clamp(13px,1.1vw,16px)] leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </FadeUp>

        {/* Links */}
        <FadeUp delay={0.3} className="mt-10 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#DEDBC8] text-black font-semibold text-[clamp(11px,0.95vw,14px)] rounded-full px-5 py-2.5 hover:bg-[#C4A882] transition-colors"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          ))}
        </FadeUp>


      </div>
    </div>
  );
}
