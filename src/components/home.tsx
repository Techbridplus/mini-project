
import React from 'react'
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import  ServerSearch  from "@/components/server/server-search";
import { ScanQrCode } from 'lucide-react';
import { Camera } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import { AlignJustify } from 'lucide-react';
import { ActionTooltip } from "@/components/action-tooltip";
import { ServerCardContainer } from './card/server-card-container';
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { ShieldCheck } from 'lucide-react';

import { db } from "@/lib/db";

async function HomePage() {
    
    const profile = await currentProfile();

  if (!profile) return redirect("/");
  const servers = await db.server.findMany();
    return (
        <div className='w-full '>
            <div className='w-full h-[50px] flex justify-between items-center px-4 my-2'>
                <AlignJustify className='w-10 h-10 md:hidden' />
                <div className='flex justify-start items-center  w-full md:px-10 px-4'>
                    <h1 className='text-[#25d366] font-bold text-2xl'>MeetMap</h1>
                </div>
                
                <div className='flex md:gap-10 gap-4'>
                    <ActionTooltip side='right' align='center' label='QR scan'>
                        <button>
                            <ScanQrCode />
                        </button>
                    </ActionTooltip>
                    
                    <ActionTooltip side='right' align='center' label='click a photo'>
                        <button>
                            <Camera />
                        </button>
                    </ActionTooltip>

                    <ActionTooltip side='right' align='center' label='menu'>
                        <button>
                            <EllipsisVertical />
                        </button>
                    </ActionTooltip>
                    
                    
                </div>
            </div>
            <div className='w-full flex items-center justify-center'>
                <ServerSearch />

            </div>
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-full mx-auto my-4" />
            <ScrollArea className="h-[610px] w-full rounded-md p-4 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {servers.map((server) => (
                        <div key={server.id}>
                            <ServerCardContainer imageUrl={server.imageUrl} title={server.name} />
                            
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default HomePage
