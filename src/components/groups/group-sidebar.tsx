import React from "react";
import { redirect } from "next/navigation";
import { ChannelType, MemberRole } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import { GroupHeader } from "@/components/groups/group-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GroupSearch } from "@/components/groups/group-search";
import { Separator } from "@/components/ui/separator";
import { GroupSection } from "@/components/groups/group-section";
import { GroupChannel } from "@/components/groups/group-channel";
import { GroupMember } from "@/components/groups/group-member";
import { useFetchServerAndGroup } from "@/hooks/use-fetch-server-and-group";

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
};

export async function GroupSidebar({ serverId, groupId }: { serverId: string, groupId: string }) {
  const { profile, server, group } = await useFetchServerAndGroup(serverId, groupId);

  if (!profile || !server) return redirect("/");

  const textChannels = group?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = group?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = group?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server?.members.filter(
    (member) => member.userId !== profile.id
  );

  const role = server.members.find(
    (member) => member.userId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      {group && <GroupHeader group={group} role={role} />}
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <GroupSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type]
                }))
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type]
                }))
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type]
                }))
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.user.name,
                  icon: roleIconMap[member.role]
                }))
              }
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <GroupSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                group && <GroupChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  group={group}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <GroupSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-[2px]">
              {audioChannels.map((channel) => (
                group && (
                  <GroupChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    group={group}
                  />
                )
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <GroupSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel) => (
                group && (
                  <GroupChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    group={group}
                  />
                )
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <GroupSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <GroupMember key={member.id} member={{ ...member, profile: member.user }} server={server} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}