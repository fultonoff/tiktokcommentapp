import { create } from "zustand";
import { CommentsState } from "@/types/storetypes";


export const useCommentsStore = create<CommentsState>((set) => ({
  message: "hello",
  name: "Besi Kongo 🇨🇬",
  updateText: (newText: string) => set({ message: newText }),
  updateName: (newText: string) => set({ name: newText }),
  clearText: () => set({ message: "" }),

  avatar: null,
  setAvatar: (value) => set({ avatar: value}),
  clearAvatar: () => set({ avatar: null }),

  // ✅ verified default = true
  verified: true,
  setVerified: (value) => set({ verified: value }),

  // 📐 Scaling
  Scale: 1,
  setScale: (value: number) => set({ Scale: value }),
}));
