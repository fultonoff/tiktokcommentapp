import { Scale } from './../../node_modules/lightningcss/node/ast.d';
import type { FileWithPreview } from "@/hooks/use-file-upload";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface CommentsState {
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

  // 📐 Scaling
    Scale?: number;
    setScale?: (value: number) => void;
}