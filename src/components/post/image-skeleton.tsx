import { useState } from "react";

export default function ImageSkeleton({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-full w-full">
      {!isLoaded && (
        <div className="bg-muted absolute inset-0 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
