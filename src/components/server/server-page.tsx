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
import ServerNevigationSidebar from '../nevigation/ServerNevigationSidebar';
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
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;
    const handleCreateServer = () => {
        console.log("Create Server clicked");
      };
    

    return (
        <div className='w-full h-full'>
            
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
