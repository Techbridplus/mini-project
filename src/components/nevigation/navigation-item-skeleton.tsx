"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function NavigationItemSkeleton() {
  return (
    <div className="group relative flex items-center">
      <Skeleton className={cn("absolute left-0 bg-muted rounded-full w-[4px] h-[8px]")} />
      <Skeleton className={cn("relative group flex mx-3 h-[48px] w-[48px] rounded-[24px]")} />
    </div>
  )
}

