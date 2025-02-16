"use client"

import { useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ServerCardProps {
  imageUrl: string
  title: string
}

export function ServerCard({ imageUrl, title }: ServerCardProps) {
  const [isJoined, setIsJoined] = useState(false)

  const handleJoin = () => {
    setIsJoined(true)
  }

  return (
    <Card className="w-full max-w-sm overflow-hidden dark:bg-zinc-600">
      <div className="relative aspect-[16/9]">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} layout="fill" objectFit="cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {isJoined ? (
          <div className="flex items-center text-green-500">
            <Check className="mr-2" />
            <span>Joined</span>
          </div>
        ) : (
          <Button onClick={handleJoin}>Join</Button>
        )}
      </CardContent>
    </Card>
  )
}

