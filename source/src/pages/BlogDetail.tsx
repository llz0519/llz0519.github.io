import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/data/posts";
import { FadeUp } from "@/components/FadeUp";

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getPostBySlug(slug || "");

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#DEDBC8] text-xl mb-4">Article not found</p>
          <Link to="/" className="text-[#C4A882] hover:underline text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactElement[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={key++}
            className="text-[clamp(24px,3vw,40px)] font-bold text-[#DEDBC8] mt-12 mb-6 leading-tight"
          >
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={key++}
            className="text-[clamp(18px,2vw,28px)] font-bold text-[#DEDBC8] mt-10 mb-4 leading-tight"
          >
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={key++}
            className="text-[clamp(16px,1.5vw,22px)] font-bold text-[#DEDBC8] mt-8 mb-3"
          >
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith("---")) {
        elements.push(
          <hr
            key={key++}
            className="border-[#22221D] my-8"
          />
        );
      } else if (line.startsWith("| ") && line.includes(" | ")) {
        // Table row - skip separator rows
        if (!line.includes("---")) {
          const cells = line
            .split("|")
            .filter((c) => c.trim())
            .map((c) => c.trim().replace(/\\`/g, "`"));
          elements.push(
            <div
              key={key++}
              className="grid gap-2 py-2 border-b border-[#22221D]"
              style={{
                gridTemplateColumns: `repeat(${cells.length}, 1fr)`,
              }}
            >
              {cells.map((cell, j) => (
                <span
                  key={j}
                  className="text-[#9A9788] text-[clamp(12px,1vw,14px)]"
                >
                  {cell}
                </span>
              ))}
            </div>
          );
        }
      } else if (line.startsWith("- ")) {
        elements.push(
          <li
            key={key++}
            className="flex items-start gap-2 text-[#9A9788] text-[clamp(13px,1.1vw,16px)] leading-relaxed ml-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4A882] mt-2 flex-shrink-0" />
            <span>{renderInline(line.slice(2))}</span>
          </li>
        );
      } else if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={key++}
            className="border-l-2 border-[#C4A882] pl-4 my-4 text-[#9A9788] text-[clamp(13px,1.1vw,16px)] italic"
          >
            {line.slice(2)}
          </blockquote>
        );
      } else if (line.trim() === "") {
        // Empty line
      } else if (line.startsWith("\`\`\`")) {
        // Code block - collect all lines until closing ```
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("\`\`\`")) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <pre
            key={key++}
            className="bg-[#0A0A0A] border border-[#22221D] rounded-xl p-4 my-4 overflow-x-auto"
          >
            <code className="text-[#DEDBC8] text-[clamp(12px,0.9vw,14px)] font-mono leading-relaxed whitespace-pre">
              {codeLines.join("\n")}
            </code>
          </pre>
        );
      } else {
        elements.push(
          <p
            key={key++}
            className="text-[#9A9788] text-[clamp(13px,1.1vw,16px)] leading-[1.8] mb-4"
          >
            {renderInline(line)}
          </p>
        );
      }
    }

    return elements;
  };

  // Simple inline formatting: **bold**, `code`
  const renderInline = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\\\`(.*?)\\\`/g, "$1")
      .replace(/\`(.*?)\`/g, "$1");
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed back button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-[#22221D] text-[#DEDBC8] hover:border-[#C4A882] hover:text-[#C4A882] transition-all duration-300"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Article header */}
      <div className="relative pt-24 pb-12 px-[clamp(20px,4vw,48px)] border-b border-[#22221D]">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[clamp(10px,0.85vw,12px)] tracking-[0.08em] uppercase text-[#C4A882]">
                {post.category}
              </span>
              <span className="text-[#5C5A50]">·</span>
              <span className="text-[clamp(10px,0.85vw,12px)] text-[#5C5A50]">
                {post.date}
              </span>
            </div>
            <h1 className="text-[clamp(28px,4vw,48px)] font-bold text-[#DEDBC8] leading-[1.1] tracking-[-0.02em]">
              {post.title}
            </h1>
            <p className="text-[#9A9788] text-[clamp(14px,1.2vw,18px)] mt-4 max-w-[600px]" style={{ lineHeight: 1.7 }}>
              {post.excerpt}
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-[800px] mx-auto px-[clamp(20px,4vw,48px)] py-[clamp(48px,8vh,96px)]">
        <FadeUp delay={0.1}>
          <article className="prose-custom">
            {renderContent(post.content)}
          </article>
        </FadeUp>

        {/* Back to list */}
        <div className="mt-16 pt-8 border-t border-[#22221D]">
          <button
            onClick={() => navigate(-1)}
            className="text-[clamp(11px,0.95vw,14px)] text-[#C4A882] hover:underline"
          >
            ← Back to articles
          </button>
        </div>
      </div>
    </div>
  );
}
