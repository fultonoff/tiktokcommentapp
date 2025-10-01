"use client"

import { useEffect } from "react"
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { TriangleAlert, User, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCommentsStore } from "@/store/store"
import Image from "next/image"

interface AvatarUploadProps {
  maxSize?: number
  className?: string
  defaultAvatar?: string
}

export default function AvatarUpload({
  maxSize = 2 * 1024 * 1024,
  className,
  defaultAvatar,
}: AvatarUploadProps) {
  const { avatar, setAvatar, clearAvatar } = useCommentsStore()

  const [
    { isDragging, errors, files },
    { removeFile, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept: "image/*",
    multiple: false,
  })

  // ✅ Update Zustand store when files change
  useEffect(() => {
    // Only set avatar if it's a FileWithPreview (i.e., an object with a 'preview' property)
    if (files[0] && typeof files[0] === "object" && "preview" in files[0]) {
      setAvatar(files[0])
    } else {
      setAvatar(null)
    }
  }, [files, setAvatar])

  const currentFile = avatar
  const previewUrl =
    currentFile && typeof currentFile === "object" && "preview" in currentFile
      ? (currentFile.preview as string)
      : defaultAvatar

  const handleRemove = () => {
    if (currentFile && typeof currentFile === "object" && "id" in currentFile) {
      removeFile(currentFile.id)
      clearAvatar()
    }

    if(avatar){
      clearAvatar()
    }
  }

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Avatar Preview */}
      <div className="relative">
        <div
          className={cn(
            "group/avatar relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border border-dashed transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/20",
            previewUrl && "border-solid"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input {...getInputProps()} className="sr-only" />

          {previewUrl ? (
            <Image
              src={typeof previewUrl === "string" ? previewUrl : ""}
              alt="Avatar"
              fill
              className="object-cover rounded-full"
            />
          ) : (

            <>
            

            {avatar ? (
              <>
              <Image
              src={avatar as string}
              alt="Avatar"
              fill
              className="object-cover rounded-full"
              />
              </>
              
            ): (
              
            <div className="flex h-full w-full items-center justify-center">
              <User className="size-6 text-muted-foreground" />
            </div>
              
            )}
            </>
          )}
        </div>

        {/* Remove Button */}
        {currentFile && (
          <Button
            size="icon"
            variant="outline"
            onClick={handleRemove}
            className="size-6 absolute end-0 top-0 rounded-full"
            aria-label="Remove avatar"
          >
            <X className="size-3.5" />
          </Button>
        )}
      </div>

      {/* Upload Instructions */}
      <div className="text-center space-y-0.5">
        <p className="text-sm font-medium">
          {currentFile ? "Avatar uploaded" : "Upload avatar"}
        </p>
        <p className="text-xs text-muted-foreground">
          PNG, JPG up to {formatBytes(maxSize)}
        </p>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" appearance="light" className="mt-5">
          <AlertIcon>
            <TriangleAlert />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>File upload error(s)</AlertTitle>
            <AlertDescription>
              {errors.map((error, index) => (
                <p key={index} className="last:mb-0">
                  {error}
                </p>
              ))}
            </AlertDescription>
          </AlertContent>
        </Alert>
      )}
    </div>
  )
}
