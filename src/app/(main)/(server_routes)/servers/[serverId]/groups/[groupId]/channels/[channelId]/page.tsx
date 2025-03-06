import React from 'react'
import { auth } from "@clerk/nextjs/server";
import { currentProfile } from "@/lib/current-profile";
import { ChatHeader } from "@/components/chat/chat-header";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ChatInput } from "@/components/chat/chat-input";
import { ChannelType } from "@prisma/client";
import { ChatMessages } from "@/components/chat/chat-messages";
interface ChannelIdPageProps {
    params: Promise<{
      serverId: string;
      groupId: string;
      channelId: string;
    }>;
  }

async function ChannelIdPage({
    params
  }: ChannelIdPageProps) {
    const { serverId, channelId,groupId } = await params;
    const profile = await currentProfile();
    const { redirectToSignIn } = await auth();
    if (!profile) return redirectToSignIn();
    const channel = await db.channel.findUnique({
        where: { id: channelId }
    });
    const member = await db.member.findFirst({
        where: { serverId: serverId, userId: profile.id }
      });
    if (!channel || !member) return redirect("/");

    return (
        <div  className="bg-white dark:bg-[#313338] flex flex-col h-screen">
            <ChatHeader
                name={channel.name}
                serverId={serverId}
                groupId={channel.groupId}
                type="channel"
            />
            {channel.type === ChannelType.TEXT && (
              <>
                <ChatMessages
                  member={member}
                  name={channel.name}
                  chatId={channel.id}
                  type="channel"
                  apiUrl="/api/messages"
                  socketUrl="/api/socket/messages"
                  socketQuery={{
                    channelId: channel.id,
                    serverId: serverId
                  }}
                  paramKey="channelId"
                  paramValue={channel.id}
                />
                <ChatInput
                  name={channel.name}
                  type="channel"
                  apiUrl="/api/socket/messages"
                  query={{
                    channelId: channel.id,
                    serverId: serverId,
                    groupId: groupId
                  }}
                />
              </>
            )}

        </div>
    )
}

export default ChannelIdPage
