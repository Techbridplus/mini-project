import { useMemo, useCallback } from 'react';
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const useFetchServerAndGroup = (serverId: string, groupId: string) => {
  const fetchServerAndGroup = useCallback(async () => {
    const profile = await currentProfile();
    if (!profile) return redirect("/");

    const server = await db.server.findUnique({
      where: { id: serverId },
      include: {
        members: {
          include: { user: true },
          orderBy: { role: "asc" }
        }
      }
    });

    const group = await db.group.findUnique({
      where: { id: groupId },
      include: { channels: true }
    });

    return { profile, server, group };
  }, [serverId, groupId]);

  const memoizedData = useMemo(() => fetchServerAndGroup(), [fetchServerAndGroup]);

  return memoizedData;
};