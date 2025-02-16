
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import {NavigationAction} from '@/components/nevigation/navigationAction';
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area";
import  ModeToggle  from "@/components/mode-toggle";
import {NavigationItemSkeleton} from "@/components/nevigation/navigation-item-skeleton";
import { NavigationItem } from "@/components/nevigation/navigation-item";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import NevigationSidebarClient from './nevigationSidebarClient';

async function NevigationSidebar()  {
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
        <NevigationSidebarClient servers={servers} />
    )
}

export default NevigationSidebar
