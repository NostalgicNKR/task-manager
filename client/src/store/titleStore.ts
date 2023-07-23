import { create } from "zustand";

interface TitleStoreType {
  title: string;
  setTitle: (title: string) => void;
}

const useTitleStore = create<TitleStoreType>((set) => ({
  title: "Home",
  setTitle: (title) => set(() => ({ title })),
}));

export default useTitleStore;
