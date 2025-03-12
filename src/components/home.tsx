import React from 'react';
import { Separator } from "@/components/ui/separator";
import ServerSearch from "@/components/server/server-search";
import { ScanQrCode, Camera, EllipsisVertical, AlignJustify } from 'lucide-react';
import { ActionTooltip } from "@/components/action-tooltip";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import qs from "query-string";
import axios from 'axios';
import { Test } from '@/components/test';
import QRCodeScanner from './qr-scan';
import { MobileToggle } from "@/components/mobile-toggle";
import ServerList from './card/server-lists';

async function HomePage() {
 const profile = await currentProfile();
 if (!profile) redirect('/');
 const profileId = profile.id;

  
  return (
    <div className='w-full'>
      <div className='w-full h-[50px] flex justify-between items-center px-4 md:my-2 mt-5'>
        <MobileToggle serverId={null} groupId={null} />
        <div className='flex justify-start items-center  w-full md:px-10 px-4'>
          <h1 className='text-[#25d366] font-bold text-2xl'>MeetMap</h1>
        </div>
        <div className='flex md:gap-10 gap-4 md:mr-4'>
          <ActionTooltip side='right' align='center' label='QR scan'>
            <QRCodeScanner />
          </ActionTooltip>
          
          {/* <ActionTooltip side='right' align='center' label='menu'>
            <button>
              <EllipsisVertical />
            </button>
          </ActionTooltip> */}
        </div>
      </div>
      <div className='w-full flex items-center justify-center md:mt-0 mt-3'>
        <ServerSearch profileId={profileId}/>
      </div>
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-full mx-auto my-4" />
      <div className='w-full flex justify-center'>
        <ServerList profileId={profile.id} apiUrl='/api/server-fetch' />
      </div>

    </div>
  );
}

export default HomePage;