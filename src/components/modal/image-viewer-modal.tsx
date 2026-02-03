import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useImageViewerModal } from "@/store/image-viewer-modal";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import { useEffect } from "react";

export default function ImageViewerModal() {
  const store = useImageViewerModal();

  // 키보드 좌우 화살표로 이동
  useEffect(() => {
    if (!store.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        store.actions.prev();
      } else if (e.key === "ArrowRight") {
        store.actions.next();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [store.isOpen, store.actions]);

  if (!store.isOpen) return null;

  const currentImageUrl = store.imageUrls[store.currentIndex];
  const hasPrev = store.currentIndex > 0;
  const hasNext = store.currentIndex < store.imageUrls.length - 1;
  const showNavigation = store.imageUrls.length > 1;

  return (
    <Dialog open={store.isOpen} onOpenChange={store.actions.close}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[90vh] max-w-[90vw] items-center justify-center border-none bg-transparent p-0 shadow-none"
      >
        {/* 닫기 버튼 */}
        <button
          onClick={store.actions.close}
          className="fixed top-4 right-4 z-50 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
        >
          <XIcon className="h-6 w-6" />
        </button>

        {/* 이전 버튼 */}
        {showNavigation && (
          <button
            onClick={store.actions.prev}
            disabled={!hasPrev}
            className="fixed left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        )}

        {/* 이미지 */}
        <div
          className="relative cursor-pointer"
          onClick={(e) => {
            if (!showNavigation) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const isLeftHalf = clickX < rect.width / 2;

            if (isLeftHalf) {
              store.actions.prev();
            } else {
              store.actions.next();
            }
          }}
        >
          <img
            src={currentImageUrl}
            alt={`확대된 이미지 ${store.currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
          />
        </div>

        {/* 다음 버튼 */}
        {showNavigation && (
          <button
            onClick={store.actions.next}
            disabled={!hasNext}
            className="fixed right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        )}

        {/* 인디케이터 */}
        {showNavigation && (
          <div className="absolute bottom-4 flex gap-1.5">
            {store.imageUrls.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === store.currentIndex
                    ? "w-3 bg-white"
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
