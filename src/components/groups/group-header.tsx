"use client";

import React from "react";
import { MemberRole,ChannelType } from "@prisma/client";
import {
  ChevronDown,
  LogOutIcon,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users
} from "lucide-react";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  groupId: string;
  createdAt: Date;
  updatedAt: Date;
}
interface Group {
  id: string;
  name: string;
  logoUrl: string;
  userId: string;
  serverId: string;
  channels: Channel[];
  createdAt: Date;
  updatedAt: Date;
}
interface GroupHeaderProps {
  group: Group;
  role?: MemberRole;
}

export function GroupHeader({group,  role }: GroupHeaderProps) {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition  overflow-hidden">
        {group.name}
          <ChevronDown className="h-5 w-5 ml-auto mr-10 md:mr-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("createChannel")}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Create Channel
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {/* {isModerator && <DropdownMenuSeparator />} */}
        
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
