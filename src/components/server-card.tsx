import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { MemberRole } from "@prisma/client" // Assumes you're using Prisma

interface ServerProps {
  server: {
    id: string
    name: string
    imageUrl: string
    role: MemberRole
    createdAt: Date
  }
}

export function ServerCard({ server }: ServerProps) {
  return (
    <Link href={`/servers/${server.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={server.imageUrl || "/placeholder.svg?height=200&width=400"}
            alt={server.name}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg truncate">{server.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
         
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Badge variant={getRoleBadgeVariant(server.role)}>{formatRole(server.role)}</Badge>
        </CardFooter>
      </Card>
    </Link>
  )
}

// Helper functions to format role names and assign badge variants
function formatRole(role: MemberRole): string {
  return (
    {
      ADMIN: "Admin",
      MODERATOR: "Moderator",
      GUEST: "Guest",
    }[role] || role
  )
}

function getRoleBadgeVariant(role: MemberRole): "default" | "secondary" | "destructive" {
  return {
    ADMIN: "destructive",
    MODERATOR: "secondary",
    GUEST: "default",
  }[role] as "default" | "secondary" | "destructive"
}

