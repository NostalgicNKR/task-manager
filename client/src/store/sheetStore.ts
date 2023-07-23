import { create } from "zustand";

interface SheetStoreType {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const useSheetStore = create<SheetStoreType>((set) => ({
  isOpen: false,
  setOpen: (isOpen) => set(() => ({ isOpen })),
}));

export default useSheetStore;
