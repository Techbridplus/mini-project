"use client";

import React from 'react'

import { AlignJustify } from 'lucide-react';
import { ActionTooltip } from "@/components/action-tooltip";
import { useSearchParams } from "next/navigation";
import { Plus } from 'lucide-react';
import EventCarousel from './event-crousel';

function ServerPage() {
    const searchParams = useSearchParams();
    const serverName = searchParams.get("name") || "defaultServerName";

    return (
        <div className='w-full h-full'>
            <div className='w-full h-[70px] flex px-4 justify-center items-center '>
                
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
            <div className=' h-[400px] flex justify-center items-center'>
                <EventCarousel />
            </div>
            <div className='w-full h-[70px] flex px-4 justify-center items-center bg-yellow-400'>
                <h1 className='text-[#25d366] font-bold text-2xl'>Events</h1>
            </div>
        </div>
    )
}

export default ServerPage
