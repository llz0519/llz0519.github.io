import { Link } from "react-router-dom";
import { WordsPullUp } from "@/components/WordsPullUp";
import { FadeUp } from "@/components/FadeUp";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { albums } from "@/data/albums";

export function Life() {
  return (
    <section
      id="life"
      className="bg-[#0A0A0A] py-[clamp(80px,12vh,160px)] px-[clamp(20px,4vw,48px)]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Label */}
        <FadeUp>
          <p className="text-[clamp(10px,0.85vw,12px)] tracking-[0.08em] uppercase text-[#5C5A50] mb-6">
            (04) LIFE
          </p>
        </FadeUp>

        {/* Heading */}
        <WordsPullUp
          text="Moments & memories."
          className="text-[clamp(36px,5vw,72px)] font-bold text-[#DEDBC8] leading-[0.95] tracking-[-0.04em]"
          tag="h2"
        />

        {/* Description */}
        <FadeUp delay={0.2} className="mt-4 max-w-[480px]">
          <p
            className="text-[#9A9788] text-[clamp(13px,1.1vw,16px)]"
            style={{ lineHeight: 1.7 }}
          >
            Collections of moments that shape who I am — study, life, and
            everything worth remembering.
          </p>
        </FadeUp>

        {/* Horizontal Scroll Album Cards — 无入场动画，避免滑动闪屏 */}
        <div className="mt-12 -mx-[clamp(20px,4vw,48px)] px-[clamp(20px,4vw,48px)]">
          <HorizontalScroll>
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </HorizontalScroll>
        </div>
      </div>
    </section>
  );
}

function AlbumCard({
  album,
}: {
  album: (typeof albums)[0];
}) {
  return (
    <div className="snap-start flex-shrink-0 w-[clamp(260px,28vw,320px)] aspect-[3/4]">
      <Link
        to={`/life/${album.id}`}
        className="group block w-full h-full rounded-2xl overflow-hidden relative"
      >
        {/* Cover image */}
        <img
          src={album.coverImage}
          alt={album.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        {/* Hover darken */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-[1]">
          <h3 className="text-[clamp(16px,1.5vw,22px)] font-bold text-[#DEDBC8]">
            {album.title}
          </h3>
          <p className="text-[clamp(10px,0.85vw,12px)] text-[#9A9788] mt-1">
            {album.entries.reduce((sum, e) => sum + e.photos.length, 0)} photos
          </p>
        </div>
      </Link>
    </div>
  );
}
