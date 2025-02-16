"use client"

import { useState, useEffect } from "react"
import { ServerCard } from "@/components/card/server-card"
import { ServerCardSkeleton } from "@/components/card/server-card-skeleton"

interface ServerCardContainerProps {
  imageUrl: string
  title: string
}

export function ServerCardContainer({ imageUrl, title }: ServerCardContainerProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <ServerCardSkeleton />
  }

  return <ServerCard imageUrl={imageUrl} title={title} />
}

