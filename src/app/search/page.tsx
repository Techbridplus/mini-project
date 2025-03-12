"use client"
import { SearchBar } from "@/components/search-bar"
import { ServerCard } from "@/components/server-card"
import { db } from "@/lib/db"

interface ServerPageProps {
  searchParams: { query: string }
}

export default async function ServersPage({ searchParams }: ServerPageProps) {
  const query = searchParams.query || ""

  // Only fetch servers if there's a search query
  const servers = query
    ? await db.server.findMany({
        where: {
          name: {
            contains: query,
            mode: "insensitive", // Case-insensitive search
          },
        },
        include: {
          user: true, // Include user information if needed
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : []

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Find Servers</h1>

      <SearchBar initialQuery={query} />

      <div className="mt-8">
        {!query ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <h3 className="mt-2 text-lg font-semibold">Search for servers</h3>
            <p className="mt-1 text-muted-foreground">Enter a server name to find matching servers</p>
          </div>
        ) : servers.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <h3 className="mt-2 text-lg font-semibold">No servers found</h3>
            <p className="mt-1 text-muted-foreground">No results for "{query}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {servers.map((server) => (
              <ServerCard key={server.id} server={server} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

