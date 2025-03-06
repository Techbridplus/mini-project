import React from 'react'
import { redirect } from "next/navigation";
import { auth} from "@clerk/nextjs/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import ServerNevigationSidebarClient from '@/components/nevigation/ServerNevigationSidebarClient';



async function ServerNevigationSidebar({serverId}:{serverId: string}) {
  const profile = await currentProfile();
  const { redirectToSignIn } = await auth();
  if (!profile) return redirectToSignIn();
  console.log(" server serverId ",serverId);
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      groups: true,
    },
  });
  // console.log(server?.groups);
    if (!server) {
        return <div>Server not found</div>;
    }
    return (
        <ServerNevigationSidebarClient {...{ serverId:serverId,name: server.name, imageUrl: server.imageUrl, groups: server.groups }} />
    )
}

export default ServerNevigationSidebar
