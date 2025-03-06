import React from "react";
import { auth} from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { GroupSidebar } from "@/components/groups/group-sidebar";

export default async function ServerIdLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string, groupId: string }>;
}) {
  const profile = await currentProfile();
  const { redirectToSignIn } = await auth();
  if (!profile) return redirectToSignIn();
  const {serverId,groupId} = await params;
  const group = await db.group.findUnique({
    where: {
      id: groupId,
    }
  });

  if (!group) return redirect(`/servers/${serverId}`);

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <GroupSidebar serverId={serverId} groupId={groupId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}
