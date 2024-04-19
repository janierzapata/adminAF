import create from "zustand";

export const loadingStore = create((set) => ({
  loading: true,
  startLoading: () => set(() => ({ loading: true })),
  stopLoading: () => set(() => ({ loading: false })),
}));
