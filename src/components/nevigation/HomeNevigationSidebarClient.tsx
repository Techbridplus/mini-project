"use client";

import React, { useState, useEffect } from 'react';
import { UserButton } from '@clerk/nextjs'
import {NavigationAction} from '@/components/nevigation/navigationAction';
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area";
import  ModeToggle  from "@/components/mode-toggle";
import {NavigationItemSkeleton} from "@/components/nevigation/navigation-item-skeleton";
import { HomeNavigationItem } from "@/components/nevigation/HomeNevigationItem";
import {Server } from '@prisma/client';


interface NevigationSidebarClientProps {
    servers: Server[];
    profileId: string;

}
function HomeNevigationSidebarClient({servers,profileId}: NevigationSidebarClientProps) {
    
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState([1,2,3,4,5,6,7,8,9,10]); 
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);
    return (
        <div className="space-y-4 flex flex-col h-full items-center text-primary w-full dark:bg-[#1e1f22] bg-[#25d366] py-3">
        <NavigationAction />
        <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
        <ScrollArea className="flex-1 w-full">
          {isLoading ? servers.map((id)=>(
            <div key={id.id} className='mb-4'>
              <NavigationItemSkeleton />
            </div>
          )):
          servers.map((server) => (
          <div key={server.id} className="mb-4">
            <HomeNavigationItem
              server={server}
              profileId={profileId}
            />
          </div>
        ))}
      </ScrollArea>
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
          {isLoading?<NavigationItemSkeleton />:
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-[48px] w-[48px]"
              }
            }}
          /> }
          
        </div>
      </div>
    )
}

export default HomeNevigationSidebarClient
