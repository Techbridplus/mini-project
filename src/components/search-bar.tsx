"use client"

import type React from "react"

import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect, useTransition } from "react"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";


interface SearchBarProps {
  initialQuery: string
}

export function SearchBar({ initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()

  // Update input field when URL query changes
  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(() => {
      // Create new URLSearchParams and add query if it's not empty
      const params = new URLSearchParams()
      if (query.trim()) {
        params.set("query", query)
      }

      // Navigate to updated URL
      const searchString = params.toString()
      router.push(`${pathname}${searchString ? `?${searchString}` : ""}`)
    })
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        {isPending ? (
          <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        ) : (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        )}
        <Input
          placeholder="Search servers by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-12"
          disabled={isPending}
        />
        
        <Button
          type="submit"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7"
          disabled={isPending || !query.trim()}
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : "Search"}
        </Button>
      </div>
    </form>
  )
}

