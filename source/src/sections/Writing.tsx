import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { WordsPullUp } from "@/components/WordsPullUp";
import { FadeUp } from "@/components/FadeUp";
import { posts } from "@/data/posts";

function PostRow({
  post,
  index,
}: {
  post: (typeof posts)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 py-5 border-b border-[#22221D] hover:bg-[#0A0A0A] transition-colors duration-300 -mx-3 px-3 rounded-lg"
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-[clamp(15px,1.4vw,20px)] font-normal text-[#DEDBC8] group-hover:text-[#C4A882] transition-colors duration-300 line-clamp-1">
            {post.title}
          </h3>
          <p className="text-[#9A9788]/70 text-[clamp(11px,0.9vw,13px)] mt-1 line-clamp-1 max-w-[500px]">
            {post.excerpt}
          </p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <span className="text-[clamp(10px,0.85vw,12px)] text-[#5C5A50] bg-[#1A1914] px-2.5 py-0.5 rounded">
            {post.category}
          </span>
          <span className="text-[clamp(10px,0.85vw,12px)] text-[#5C5A50] hidden sm:inline">
            {post.date}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function Writing() {
  return (
    <section
      id="writing"
      className="bg-black py-[clamp(80px,12vh,160px)] px-[clamp(20px,4vw,48px)]"
    >
      <div className="max-w-[800px] mx-auto">
        {/* Section Label */}
        <FadeUp>
          <p className="text-[clamp(10px,0.85vw,12px)] tracking-[0.08em] uppercase text-[#5C5A50] mb-6">
            (03) WRITING
          </p>
        </FadeUp>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <WordsPullUp
            text="Thoughts & Notes"
            className="text-[clamp(36px,5vw,72px)] font-bold text-[#DEDBC8] leading-[0.95] tracking-[-0.04em]"
            tag="h2"
          />
          <FadeUp delay={0.3}>
            <span className="text-[clamp(11px,0.95vw,14px)] text-[#5C5A50] whitespace-nowrap">
              {posts.length} 篇文章
            </span>
          </FadeUp>
        </div>

        {/* Post List */}
        <div>
          {posts.map((post, i) => (
            <PostRow key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
