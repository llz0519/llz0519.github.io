import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getAlbumById } from "@/data/albums";
import { FadeUp } from "@/components/FadeUp";

export function AlbumDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const album = getAlbumById(id || "");

  if (!album) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#DEDBC8] text-xl mb-4">Album not found</p>
          <Link to="/" className="text-[#C4A882] hover:underline text-sm">
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

      {/* Hero cover */}
      <div className="relative h-[45vh] min-h-[280px] max-h-[450px] rounded-b-[2rem] overflow-hidden">
        <img
          src={album.coverImage}
          alt={album.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 z-10">
          <div className="max-w-[800px] mx-auto">
            <h1 className="text-[clamp(32px,5vw,64px)] font-bold text-[#DEDBC8] leading-[0.95] tracking-[-0.04em]">
              {album.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-[clamp(20px,4vw,48px)] py-[clamp(48px,8vh,96px)]">
        {/* Album description */}
        <FadeUp>
          <p
            className="text-[#9A9788] text-[clamp(14px,1.2vw,18px)]"
            style={{ lineHeight: 1.8 }}
          >
            {album.description}
          </p>
        </FadeUp>

        {/* Photo-Text Entries */}
        <div className="mt-16 space-y-16">
          {album.entries.map((entry, i) => (
            <PhotoTextEntry key={i} entry={entry} index={i} />
          ))}
        </div>


      </div>
    </div>
  );
}

function PhotoTextEntry({
  entry,
  index,
}: {
  entry: { photos: string[]; text: string };
  index: number;
}) {
  return (
    <FadeUp delay={0.1 * index}>
      {/* Photos */}
      <div
        className={`grid gap-3 ${
          entry.photos.length === 1
            ? "grid-cols-1"
            : entry.photos.length === 2
              ? "grid-cols-2"
              : "grid-cols-3"
        }`}
      >
        {entry.photos.map((photo, j) => (
          <div
            key={j}
            className="rounded-xl overflow-hidden aspect-[4/3]"
          >
            <img
              src={photo}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Text */}
      <p
        className="text-[#9A9788] text-[clamp(13px,1.1vw,16px)] leading-[1.8] mt-5 max-w-[640px]"
      >
        {entry.text}
      </p>
    </FadeUp>
  );
}
