"use client";

import React, { useRef, useState, useEffect } from "react";
import { Loader2, ServerCrash } from "lucide-react";
import { ServerCardContainer } from "@/components/card/server-card-container";
import { Server } from "@prisma/client";
import { useInView } from "react-intersection-observer";
import { useGetServer } from "@/hooks/use-get-server";
import { useServerScroll } from "@/hooks/user-server-scroll";

interface ServerListProps {
  profileId: string;
  apiUrl: string;
}

const ServerList = ({ profileId, apiUrl }: ServerListProps) => {
  const queryKey = `server:${profileId}`;
  const serverRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useGetServer({
    queryKey,
    apiUrl,
  });
  useServerScroll({
    serverRef,
    bottomRef,
    shouldLoadMore: hasNextPage,
    loadMore: fetchNextPage,
    count: data?.pages.length || 0,
  });

  if (status === "pending")
      return (
        <div className="flex flex-col flex-1 justify-center items-center">
          <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Loading servers...
          </p>
        </div>
      );

  if (status === "error")
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );

  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto h-[640px] " ref={serverRef}>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mx-1 md:ml-10">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.items.map((server: Server) => (
              <ServerCardContainer
                imageUrl={server.imageUrl}
                title={server.name}
                userId={profileId}
                serverUserId={server.userId}
                serverId={server.id}

              
              />
            ))}
          </React.Fragment>
        ))}
        
      </div>
      <div className="flex justify-center items-center">
        {isFetchingNextPage && <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4   \" />}
      </div>
      
      <div ref={bottomRef}/>
      

    </div>
  );
};

export default ServerList;
