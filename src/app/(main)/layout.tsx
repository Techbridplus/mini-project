import React from 'react'
import ServerNevigationSidebar from '@/components/nevigation/ServerNevigationSidebar'



async function Layout({children}:{children:React.ReactNode}) {
    
    
    
      
    return (
        <div className='h-full flex'>
           <div className='bg-red-400 w-[72px] hidden md:block '>
                <ServerNevigationSidebar />
           </div>
           <main className='  w-full bg-[#FFFFFF] dark:bg-[#3a3c3f]'>
                {children}
           </main>
        </div>
    )
}

export default Layout
