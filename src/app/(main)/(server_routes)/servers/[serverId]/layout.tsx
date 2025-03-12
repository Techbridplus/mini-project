import React from 'react';
import ServerNevigationSidebar from '@/components/nevigation/ServerNevigationSidebar';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}

async function Layout({ children, params }: LayoutProps) {
  const { serverId } = await params;
  console.log(serverId);
  return (
    <div className='h-full flex'>
      <div className='bg-red-400 w-[72px] hidden md:block'>
        <ServerNevigationSidebar serverId={serverId} />
      </div>
      
      <main className='w-full bg-[#FFFFFF] dark:bg-[#3a3c3f]'>
        {children}
      </main>
    </div>
  );
}

export default Layout;