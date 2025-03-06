import React from "react";
import  {auth}  from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { getOrCreateConversation } from "@/lib/conversation";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import  MediaRoom  from "@/components/media-room";


interface MemberIdPageProps {
  params: Promise<{
    memberId: string;
    serverId: string;
    groupId: string;
  }>;
  searchParams:Promise<{
    video?: boolean;
  }>;
}



export default async function MemberIdPage({params,searchParams}: MemberIdPageProps) {
  const { memberId, serverId,groupId } = await params;
  const { video } = await searchParams; 
  const { redirectToSignIn } = await auth();
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const currentMember = await db.member.findFirst({
    where: {
      serverId,
      userId: profile.id
    },
    include: {
      user: true
    }
  });

  if (!currentMember) return redirect("/");

  const conversation = await getOrCreateConversation(
    currentMember.id,
    memberId
  );

  if (!conversation) return redirect(`/servers/${serverId}`);

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.userId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-screen">
      <ChatHeader
        imageUrl={otherMember.user.imageUrl}
        name={otherMember.user.name}
        serverId={serverId}
        groupId={groupId}
        type="conversation"
      />
      {video && <MediaRoom chatId={conversation.id} video audio />}
      {!video && (
        <>
          <ChatMessages
            member={currentMember}
            name={otherMember.user.name}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id
            }}
          />
          <ChatInput
            name={otherMember.user.name}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id
            }}
          />
        </>
      )}
    </div>
  );
}


