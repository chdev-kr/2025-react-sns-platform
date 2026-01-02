export default function GlobalLoader() {
  return (
    <div className="bg-muted flex h-[100vh] w-[100vw] flex-col items-center justify-center overflow-hidden px-4">
      <div className="flex flex-col items-center gap-6">
        <div className="text-foreground text-4xl font-bold">SPAGHETTI</div>

        <div className="text-muted-foreground text-sm font-medium">
          엮이고 이어지는 공간
        </div>

        <div className="flex gap-1">
          <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
          <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
          <div className="bg-primary h-2 w-2 animate-bounce rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
