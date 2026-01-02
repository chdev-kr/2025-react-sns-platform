import { useEffect, useState } from "react";

const asciiArt = [
  " ███████╗██████╗  █████╗  ██████╗ ██╗  ██╗███████╗████████╗████████╗██╗",
  " ██╔════╝██╔══██╗██╔══██╗██╔════╝ ██║  ██║██╔════╝╚══██╔══╝╚══██╔══╝██║",
  " ███████╗██████╔╝███████║██║  ███╗███████║█████╗     ██║      ██║   ██║",
  " ╚════██║██╔═══╝ ██╔══██║██║   ██║██╔══██║██╔══╝     ██║      ██║   ██║",
  " ███████║██║     ██║  ██║╚██████╔╝██║  ██║███████╗   ██║      ██║   ██║",
  " ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝   ╚═╝      ╚═╝   ╚═╝",
];

const subtitle = "엮이고 이어지는 공간";

export default function IntroPage() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    if (currentLine < asciiArt.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + asciiArt[currentLine] + "\n");
        setCurrentLine((prev) => prev + 1);
      }, 150);

      return () => clearTimeout(timer);
    } else if (!showSubtitle) {
      const timer = setTimeout(() => {
        setShowSubtitle(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [currentLine, showSubtitle]);

  return (
    <div className="bg-muted flex h-[100vh] w-[100vw] flex-col items-center justify-center overflow-hidden px-4">
      <div className="flex flex-col items-center gap-6">
        <pre
          className="text-foreground font-mono text-[0.4rem] leading-tight select-none sm:text-[0.6rem] md:text-xs lg:text-sm"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {displayedText}
          {currentLine < asciiArt.length && (
            <span className="animate-pulse">▊</span>
          )}
        </pre>

        {showSubtitle && (
          <div className="text-muted-foreground animate-in fade-in slide-in-from-bottom-2 text-sm font-medium duration-500 sm:text-base">
            {subtitle}
          </div>
        )}

        {showSubtitle && (
          <div className="animate-in fade-in flex gap-1 duration-700">
            <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
            <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
            <div className="bg-primary h-2 w-2 animate-bounce rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}
