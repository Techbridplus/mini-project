"use client";

import React ,{useEffect}from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { MemberRole,Server } from "@prisma/client";
import { db } from "@/lib/db";
import axios from "axios";
import { EllipsisVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  LogOutIcon,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users
} from "lucide-react";
interface NavigationItemProps {
  server:Server;
  profileId: string;
}

export function HomeNavigationItem({ server,profileId }: NavigationItemProps) {
  const params = useParams();
  const router = useRouter();
  const [rightClick, setRightClick] = React.useState(true);
   const { onOpen } = useModal();

  const onClick = () => {
    router.push(`/servers/${server.id}?name=${encodeURIComponent(server.name)}`);
  };
  
  
  const onRightClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setRightClick(true);

    const userRole = await axios.get(`/api/servers/${server.id}/role`).then((res) => res.data.role);
    const isAdmin = userRole === MemberRole.ADMIN;
    const isModerator = isAdmin || userRole === MemberRole.MODERATOR;
   if(isAdmin){
    onOpen("deleteServer", { server });
    }
    else {
      onOpen("leaveServer", { server });
    }
    // <DropdownMenu open={true} >
    //   <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px] z-50">
    //       {isAdmin && (
    //       <DropdownMenuItem
    //           onClick={() => onOpen("deleteServer", { server })}
    //           className="px-3 py-2 text-sm cursor-pointer text-rose-500"
    //       >
    //           Delete Server
    //           <Trash className="h-4 w-4 ml-auto" />
    //       </DropdownMenuItem>
    //       )}
    //       {!isAdmin && (
    //       <DropdownMenuItem
    //           onClick={() => onOpen("leaveServer", { server })}
    //           className="px-3 py-2 text-sm cursor-pointer text-rose-500"
    //       >
    //           Leave Server
    //           <LogOutIcon className="h-4 w-4 ml-auto" />
    //       </DropdownMenuItem>
    //       )}
    //   </DropdownMenuContent>
    // </DropdownMenu>
  
  };

  return (
    <ActionTooltip side="right" align="center" label={server.name}>
      <button onClick={onClick} onContextMenu={onRightClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-white rounded-full transition-all w-[4px]",
            params?.serverId !== server.id && "group-hover:h-[20px]",
            params?.serverId === server.id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === server.id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={server.imageUrl} alt="Channel" />
        </div>
      </button>
    </ActionTooltip>
  );
}
