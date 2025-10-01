"use client"

import React, { useState, useEffect } from "react"
import { useGeneratedImage } from "@/hooks/use-generate-image"
import { Textarea } from "../ui/textarea"
import { Card, CardAction, CardContent} from "../ui/card"
import {Sparkles, Upload } from "lucide-react"
import { Button } from "../ui/button"
import Image from "next/image"
import AITextLoading from "./ai-loading"
import { useCommentsStore } from "@/store/store"
import toast from 'react-hot-toast';


const MyImageGenerator: React.FC = () => {
  const [input, setInput] = useState("")      // user typing
  const [prompt, setPrompt] = useState("Congo")    // actual prompt to generate
  const [isLoading, setIsLoading] = useState(false)

  const {setAvatar} = useCommentsStore()

  
  const imageUrl = useGeneratedImage(prompt, { width: 512, height: 512 })
  console.log('image',imageUrl);
  
  // Whenever the prompt changes, mark as loading
  useEffect(() => {
    if (prompt) setIsLoading(true)
  }, [prompt, imageUrl])

  //setAvartar(imageUrl)
  const handleSetAvatar = (url: string | null) => {
  if (url) {
    setAvatar(url)

    // ✅ Log confirmation
    // console.log("✅ Avatar URL set to:", url)
    toast.success("Image inserted to comment", {
      position: "bottom-right",
      duration: 4000,
    })
  } else {
    console.log("⚠️ No URL provided")
  }
}

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-accent">

      {/* Result */}
      <div className="mt-4 h-[200px] w-[200px]">
        {imageUrl ? (
          <Image
          src={imageUrl}
          alt={`Generated from: ${prompt}`}
          className="w-full h-full object-cover object-center rounded shadow"
          onLoad={() => setIsLoading(false)}   // ✅ marks loading complete
          onError={() => setIsLoading(false)}
          // fallback if load fails
          width={400}
          height={400}
          />
          
        ): <p>image goes here</p>}

        
        {isLoading && <AITextLoading/>
        }
          


      </div>
      <Card className="p-0 w-full flex flex-col items-center">

        <CardContent className="p-0 w-full overflow-hidden">


      {/* Prompt Input */}
      <Textarea
        placeholder="Type a prompt..."
        value={input}
        disabled={isLoading}
        onChange={(e) => setInput(e.target.value)}
        className="border rounded px-3 py-2 w-full border-none"
        />
        </CardContent>
      <CardAction className="w-full p-0">

      {/* Generate Button */}
      <div className="min-w-full flex gap-2 mr-auto p-2 border">
        <Button size={'lg'} type='submit' variant="outline" className="flex items-center gap-1 text-xs cursor-pointer" disabled={!imageUrl} onClick={() => handleSetAvatar(imageUrl)}>
          <Upload/>
          Inset to comment
        </Button>

      <Button
        onClick={() => setPrompt(input)}
        className="flex items-center ml-auto" disabled={!input || isLoading}
        >
          <Sparkles/>
          <span>

        Generate
          </span>
      </Button>

          </div>
          </CardAction>
        </Card>

      
    </div>
  )
}

export default MyImageGenerator
