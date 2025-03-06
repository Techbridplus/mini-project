"use client";

import React from 'react'

import { AlignJustify } from 'lucide-react';
import { ActionTooltip } from "@/components/action-tooltip";
import { useSearchParams } from "next/navigation";
import { Plus } from 'lucide-react';
import EventCarousel from './event-crousel';
import Dropdown from '../dropdown';
import { EllipsisVertical } from 'lucide-react';
import { useModal } from "@/hooks/use-modal-store";
import { GroupHeader } from '../groups/group-header';
import { MemberRole } from "@prisma/client";
import { ServerWithMembersWithProfiles } from "@/types";
import {
    LogOutIcon,
    PlusCircle,
    Settings,
    Trash,
    UserPlus,
    Users
  } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
function ServerPage({serverId,role,server}: {serverId: string,role: MemberRole,server:ServerWithMembersWithProfiles}) {
    const { onOpen } = useModal();
    const searchParams = useSearchParams();
    const serverName = searchParams?.get("name") || "defaultServerName";
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;
    const handleCreateServer = () => {
        console.log("Create Server clicked");
      };
    
      const handleCreateGroup = () => {
        console.log("Create Group clicked");
      };

    return (
        <div className='w-full h-full'>
            <div className='w-full h-[70px] flex px-4 justify-center items-center '>
                
                <div className='flex justify-start items-center  w-full md:px-10 px-4'>
                    <h1 className='text-[#25d366] font-bold text-2xl'>{serverName}</h1>
                </div>
                
                <div className='flex md:gap-10 gap-4'>
                    
                    
                    <ActionTooltip side="right" align="center" label="Create a server">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button 
                                    className="group flex items-center"
                                >
                                    <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-zinc-200 dark:bg-zinc-500 group-hover:bg-[#25D366]">
                                        <Plus
                                        className="group-hover:text-white transition text-emerald-400"
                                        size={30}
                                        />
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-30">
                                <DropdownMenuItem onClick={() => onOpen("createEvent")} className="font-bold text-blue-600">
                                Create Event
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onOpen("createGroup",{},serverId)}>
                                Create Group
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                              
                    </ActionTooltip>

                    
                    
                    
                </div>
                <ActionTooltip side="right" align="center" label="customize server">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none" asChild>
                            <button className=" text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800  hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition  overflow-hidden">
                                <EllipsisVertical/>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                            {isModerator && (
                            <DropdownMenuItem
                                onClick={() => onOpen("invite", { server })}
                                className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                            >
                                Invite People
                                <UserPlus className="h-4 w-4 ml-auto" />
                            </DropdownMenuItem>
                            )}
                            {isAdmin && (
                            <DropdownMenuItem
                                onClick={() => onOpen("editServer", { server })}
                                className="px-3 py-2 text-sm cursor-pointer"
                            >
                                Server Settings
                                <Settings className="h-4 w-4 ml-auto" />
                            </DropdownMenuItem>
                            )}
                            {isAdmin && (
                            <DropdownMenuItem
                                onClick={() => onOpen("members", { server })}
                                className="px-3 py-2 text-sm cursor-pointer"
                            >
                                Manage Members
                                <Users className="h-4 w-4 ml-auto" />
                            </DropdownMenuItem>
                            )}
                            {isModerator && <DropdownMenuSeparator />}
                            {isAdmin && (
                            <DropdownMenuItem
                                onClick={() => onOpen("deleteServer", { server })}
                                className="px-3 py-2 text-sm cursor-pointer text-rose-500"
                            >
                                Delete Server
                                <Trash className="h-4 w-4 ml-auto" />
                            </DropdownMenuItem>
                            )}
                            {!isAdmin && (
                            <DropdownMenuItem
                                onClick={() => onOpen("leaveServer", { server })}
                                className="px-3 py-2 text-sm cursor-pointer text-rose-500"
                            >
                                Leave Server
                                <LogOutIcon className="h-4 w-4 ml-auto" />
                            </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ActionTooltip>
                
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
