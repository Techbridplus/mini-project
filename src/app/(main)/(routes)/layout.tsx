import React from 'react'
import NevigationSidebar from '@/components/nevigation/nevigationSidebar'



async function Layout({children}:{children:React.ReactNode}) {
    
    
    
      
    return (
        <div className='h-full '>

                {children}

        </div>
    )
}

export default Layout
