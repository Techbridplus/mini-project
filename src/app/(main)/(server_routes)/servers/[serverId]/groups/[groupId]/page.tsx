import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface ServerIdPageProps {
  params: Promise<{
    groupId: string;
    serverId: string;

  }>;
}

export default async function ServerIdPage({ params }: ServerIdPageProps) {
  const profile = await currentProfile();
  const { redirectToSignIn } = await auth()
  const { groupId,serverId } = await params;
  if (!profile) return redirectToSignIn();

  const server = await db.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      channels: {
        where: {
          name: "general"
        },
        orderBy: { createdAt: "asc" }
      }
    }
  });
  console.log("server",server);
  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") return null;

  return redirect(`/servers/${serverId}/groups/${groupId}/channels/${initialChannel?.id}`);
}
