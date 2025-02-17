import React from 'react'
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import HomeNevigationSidebarClient from '@/components/nevigation/HomeNevigationSidebarClient';

async function HomeNevigationSidebar()  {
  const profile = await currentProfile();
 

  if (!profile) return redirect("/");

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          userId: profile.id
        }
      }
    }
  });


    return (
        <HomeNevigationSidebarClient  servers={servers} />
    )
}

export default HomeNevigationSidebar
