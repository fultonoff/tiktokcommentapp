
import { create } from "zustand"

interface CaptureState {
  captureRef: React.RefObject<HTMLElement> | null
  setCaptureRef: (ref: React.RefObject<HTMLElement>) => void
}

const useCaptureStore = create<CaptureState>((set) => ({
  captureRef: null,
  setCaptureRef: (ref) => set({ captureRef: ref }),
}))

export default useCaptureStore
