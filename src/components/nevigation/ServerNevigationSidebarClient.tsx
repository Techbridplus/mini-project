"use client";

import React, { useState, useEffect } from 'react';
import { UserButton } from '@clerk/nextjs'
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area";
import  ModeToggle  from "@/components/mode-toggle";
import {NavigationItemSkeleton} from "@/components/nevigation/navigation-item-skeleton";
import ServerNavigationItem from './ServerNevigationItem';
import { House } from 'lucide-react';
import { NavigationItem } from "@/components/nevigation/navigation-item";
import { Users } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import { Redirect } from 'next';
interface Group {
  id: string;
  name: string;
  logoUrl: string;
  userId: string;
  serverId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface GroupProps {
  groups: Group[];
}


function ServerNevigationSidebarClient({serverId,name,imageUrl,groups}: {serverId:string, name: string, imageUrl: string, groups: Group[]}) {
  const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState([1,2,3,4,5,6,7,8,9,10]); 
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);
    const onClick = () => {
      return redirect(`/servers/${serverId}?name=${encodeURIComponent(name)}`);  
    }
    
    return (
      <div className="space-y-4 flex flex-col h-full items-center text-primary w-full dark:bg-[#1e1f22] bg-[#25d366] py-3">
        <button onClick={() => {return redirect('/')}} >
          <House />
        </button>
      
      
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />

      <button onClick={onClick} className="group relative flex items-center">
        <ServerNavigationItem
        imageUrl={imageUrl}
        name={name}
        />
      </button>
      
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />

      <div className='flex flex-col items-center '>
        <Users />
        <ChevronDown className='mr-1'/>
      </div>
      
      <ScrollArea className="flex-1 w-full">
        {isLoading ? (
          groups.map((group:Group) => (
            <div key={group.id} className="mb-4">
              <NavigationItemSkeleton />
            </div>
          ))
        ) : (
          groups.map((group: Group) => (
            <div key={group.id} className="mb-4">
              <NavigationItem serverId={serverId} id={group.id} imageUrl={group.logoUrl} name={group.name} />
            </div>
          ))
        )}
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

export default ServerNevigationSidebarClient
