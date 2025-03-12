import React from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ServerNavigationSidebar from "@/components/nevigation/ServerNevigationSidebar";
import { GroupSidebar } from "@/components/groups/group-sidebar";
import HomeNevigationSidebar from '@/components/nevigation/HomeNevigationSidebar'

export function MobileToggle({ serverId,groupId }: { serverId: string|null,groupId: string|null }) {
  const open = !serverId && !groupId;
  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      {serverId && <SheetContent side="left" className={`p-0 flex gap-0 `}>
        <div className="w-[72px]">
          <ServerNavigationSidebar serverId={serverId}/>
        </div>
          {groupId && <GroupSidebar serverId={serverId} groupId={groupId} />}
      </SheetContent>}
      <SheetContent side="left" className={`p-0 flex gap-0 `}>
        <div className="w-[72px]">
          {open && <HomeNevigationSidebar />}
        </div>
          
      </SheetContent>

      {/* {groupId!=''?
        <SheetContent side="left" className={`p-0 flex gap-0 `}>
        <div className="w-[72px]">
          <ServerNavigationSidebar serverId={serverId}/>
        </div>
        <GroupSidebar serverId={serverId} groupId={groupId} />:<></>
      </SheetContent>:
      <SheetContent side="left" className={`p-0 flex gap-0 w-[120px]`}>
      <div className="w-[72px]">
        <ServerNavigationSidebar serverId={serverId}/>
      </div>
    </SheetContent>
    } */}
      
    </Sheet>
  );
}
