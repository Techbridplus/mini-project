import React from 'react'
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import ServerNevigationSidebarClient from '@/components/nevigation/ServerNevigationSidebarClient';

async function ServerNevigationSidebar()  {
  const profile = await currentProfile();
 

  if (!profile) return redirect("/");

 

    return (
        <ServerNevigationSidebarClient  />
    )
}

export default ServerNevigationSidebar
