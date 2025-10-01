import { create } from "zustand";
import type { FileWithPreview } from "@/hooks/use-file-upload";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface CommentsState {
  message: string;
  name: string;
  updateText: (newText: string) => void;
  updateName: (newText: string) => void;
  clearText: () => void;

  // 📷 avatar

  avatar: FileWithPreview | StaticImport | string | null
  setAvatar: (value: FileWithPreview | StaticImport | string | null) => void
  clearAvatar: () => void;

  // ✅ verified check
  verified: boolean;
  setVerified: (value: boolean) => void;
}

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
}));
