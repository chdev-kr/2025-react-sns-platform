import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type OpenState = {
  isOpen: true;
  imageUrls: string[];
  currentIndex: number;
};

type CloseState = {
  isOpen: false;
};

type State = CloseState | OpenState;

const initialState = {
  isOpen: false,
} as State;

const useImageViewerModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: (imageUrls: string[], currentIndex: number = 0) => {
          set({ isOpen: true, imageUrls, currentIndex });
        },
        close: () => {
          set({ isOpen: false });
        },
        next: () => {
          set((state) => {
            if (!state.isOpen) return state;
            const nextIndex =
              state.currentIndex < state.imageUrls.length - 1
                ? state.currentIndex + 1
                : state.currentIndex;
            return { ...state, currentIndex: nextIndex };
          });
        },
        prev: () => {
          set((state) => {
            if (!state.isOpen) return state;
            const prevIndex =
              state.currentIndex > 0
                ? state.currentIndex - 1
                : state.currentIndex;
            return { ...state, currentIndex: prevIndex };
          });
        },
      },
    })),
    { name: "ImageViewerModalStore" },
  ),
);

export const useOpenImageViewerModal = () => {
  const open = useImageViewerModalStore((store) => store.actions.open);
  return open;
};

export const useImageViewerModal = () => {
  const store = useImageViewerModalStore();
  return store as typeof store & State;
};
