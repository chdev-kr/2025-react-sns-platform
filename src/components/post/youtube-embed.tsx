import { PlayIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface YoutubeEmbedProps {
  videoId: string;
}

export default function YoutubeEmbed({ videoId }: YoutubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    // YouTube oEmbed API로 영상 제목 가져오기
    fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    )
      .then((res) => res.json())
      .then((data) => setTitle(data.title))
      .catch(() => setTitle(null));
  }, [videoId]);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  if (isPlaying) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsPlaying(true)}
      className="hover:bg-muted flex w-full items-center gap-3 overflow-hidden rounded-xl border p-2 text-left transition-colors"
    >
      {/* 썸네일 */}
      <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={thumbnailUrl}
          alt="YouTube 썸네일"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <PlayIcon className="h-6 w-6 fill-white text-white" />
        </div>
      </div>

      {/* 제목 */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-muted-foreground text-xs">YouTube</span>
        <span className="line-clamp-2 text-sm font-medium">
          {title || "영상 보기"}
        </span>
      </div>
    </button>
  );
}
