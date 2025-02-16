"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { useState, useEffect } from "react"
import type { CarouselApi } from "@/components/ui/carousel"

const carouselItems = [
  { id: 1, title: "Nature", description: "Beautiful landscapes", image: "/placeholder.svg?height=360&width=640" },
  { id: 2, title: "City", description: "Urban adventures", image: "/placeholder.svg?height=360&width=640" },
  { id: 3, title: "Technology", description: "Futuristic innovations", image: "/placeholder.svg?height=360&width=640" },
  { id: 4, title: "Food", description: "Culinary delights", image: "/placeholder.svg?height=360&width=640" },
  { id: 5, title: "Art", description: "Creative expressions", image: "/placeholder.svg?height=360&width=640" },
]

export default function EventCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    const handleSelect = () => {
      setCurrentIndex(api.selectedScrollSnap())
    }

    api.on("select", handleSelect)

    return () => {
      api.off("select", handleSelect)
    }
  }, [api])

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-full max-w-6xl mx-auto  flex items-center justify-center"
      setApi={setApi}
    >
      <CarouselContent className="-ml-2 md:-ml-4 h-full ">
        {carouselItems.map((item, index) => (
          <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/3 ">
            <div className="p-1  h-[300px] flex flex-col justify-center ">
              <Card
                className={`rounded-xl overflow-hidden transition-all duration-300 
                  ${
                    index === currentIndex
                      ? "border-4 border-primary scale-110 z-10"
                      : "border-4 border-transparent scale-90 opacity-70"
                  }
                  hover:border-primary/50 hover:opacity-100`}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-xl"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}