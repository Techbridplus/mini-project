import { Card, CardContent } from "@/components/ui/card"

export function ServerCardSkeleton() {
  return (
    <Card className="w-full max-w-sm overflow-hidden dark:bg-zinc-700">
      <div className="aspect-[16/9] bg-gray-200 dark:bg-zinc-500 animate-pulse" />
      <CardContent className="p-4">
        <div className="h-6 bg-gray-200 dark:bg-zinc-500  rounded w-3/4 mb-2 animate-pulse" />
        <div className="h-10 bg-gray-200 dark:bg-zinc-500  rounded w-1/3 animate-pulse" />
      </CardContent>
    </Card>
  )
}

