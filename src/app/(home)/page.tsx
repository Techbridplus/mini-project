import React from 'react'

import HomePage from '@/components/home'
import { initialProfile } from "@/lib/initial-profile";
import HomeNevigationSidebar from '@/components/nevigation/HomeNevigationSidebar'

 async function Home() {
    
    await initialProfile();

    return (
        <div className='h-full flex'>
           <div className='bg-red-400 w-[72px] hidden md:block '>
                <HomeNevigationSidebar/>
           </div>
           <main className='  w-full bg-[#FFFFFF] dark:bg-[#3a3c3f]'>
                <HomePage/>
           </main>
        </div>
    )
}

export default Home
