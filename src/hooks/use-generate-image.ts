import { usePollinationsImage } from "@pollinations/react"

interface GenerateImageOptions {
  width?: number
  height?: number
  seed?: number
  model?: string
  nologo?: boolean
  enhance?: boolean
}

/**
 * Custom hook to generate an image URL for a given prompt.
 * You can call this inside any React component.
 */
export function useGeneratedImage(
  prompt: string,
  {
    width = 1024,
    height = 1024,
    seed = 42,
    model = "flux",
    nologo = true,
    enhance = false,
  }: GenerateImageOptions = {}
): string {
  return usePollinationsImage(prompt, {
    width,
    height,
    seed,
    model,
    nologo,
    enhance,
  })
}
