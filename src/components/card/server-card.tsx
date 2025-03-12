"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Check, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"
import qs from "query-string"

interface ServerCardProps {
  imageUrl: string
  title: string
  userId: string
  serverUserId: string
  serverId: string
}

export function ServerCard({ imageUrl, title, userId, serverUserId, serverId }: ServerCardProps) {
  const [isJoined, setIsJoined] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkMembership = async () => {

      try {
        const response = await axios.get(`/api/servers/check`, {
          params: { serverId }
        });
        setIsJoined(response.data.isMember);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkMembership();
  }, [serverId]);

  const handleJoin = async () => {
    try {
      await axios.patch(`/api/servers/join`, { serverId });
      setIsJoined(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full md:h-[320px] max-w-sm overflow-hidden dark:bg-zinc-600">
      <div className="relative aspect-[16/9]">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} layout="fill" objectFit="cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {serverUserId === userId ? (
          <div className="flex items-center text-green-500">
            <ShieldCheck className="mr-2" />
            <span>Owner</span>
          </div>
        ) : isJoined ? (
          <div className="flex items-center text-green-500">
            <Check className="mr-2" />
            <span>Joined</span>
          </div>
        ) : (
          <Button onClick={handleJoin} disabled={loading}>
            {loading ? "Checking..." : "Join"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}