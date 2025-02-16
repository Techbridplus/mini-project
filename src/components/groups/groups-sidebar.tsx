"use client";

import React from 'react'
import { Separator } from "@/components/ui/separator";
import { AlignJustify } from 'lucide-react';
import { ActionTooltip } from "@/components/action-tooltip";
import { useSearchParams } from "next/navigation";
import { ScanQrCode } from 'lucide-react';
import { Camera } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import { Plus } from 'lucide-react';

function GroupsSidebar() {
    const searchParams = useSearchParams();
    const serverName = searchParams.get("name") || "defaultServerName";

    return (
        <div className='w-full '>
            <div className='w-full h-[50px] flex px-4 justify-center items-center '>
                <AlignJustify className='w-10 h-10 md:hidden' />
                <div className='flex justify-start items-center  w-full md:px-10 px-4'>
                    <h1 className='text-[#25d366] font-bold text-2xl'>{serverName}</h1>
                </div>
                
                <div className='flex md:gap-10 gap-4'>
                    
                    
                    <ActionTooltip side='right' align='center' label='click a photo'>
                        <button className='bg-[#25d366] flex justify-center items-center gap-1 w-[100px] h-[40px] rounded-lg text-white '>
                            <p className='text-lg  font-medium'>Create</p> 
                            <Plus />
                        </button>
                    </ActionTooltip>

                    <ActionTooltip side='right' align='center' label='Create group'>
                        <button className='bg-[#25d366] flex justify-center items-center gap-1 w-[100px] h-[40px] rounded-lg text-white '>
                            <p className='text-lg  font-medium'>Create</p> 
                            <Plus />
                        </button>
                    </ActionTooltip>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default GroupsSidebar
