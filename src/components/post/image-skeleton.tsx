import { useState } from "react";

export default function ImageSkeleton({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative h-full w-full">
      {!isLoaded && !hasError && (
        <div className="bg-muted absolute inset-0 animate-pulse" />
      )}
      {hasError && (
        <div className="bg-muted absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
          이미지 로드 실패
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
