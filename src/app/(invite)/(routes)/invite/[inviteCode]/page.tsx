import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface InviteCodPageProps {
  params: Promise<{
    inviteCode: string;
  }>;
}

export default async function InviteCodPage({params}: InviteCodPageProps) {
  const { inviteCode } = await params;
  const profile = await currentProfile();
  const { redirectToSignIn } = await auth();
  if (!profile) return redirectToSignIn();

  if (!inviteCode) return redirect("/");

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          userId: profile.id
        }
      }
    }
  });

  if (existingServer) return redirect(`/servers/${existingServer.id}?severname=${existingServer.name}`);

  const server = await db.server.update({
    where: {
      inviteCode
    },
    data: {
      members: {
        create: [{ userId: profile.id }]
      }
    }
  });

  if (server) return redirect(`/servers/${server.id}?severname=${server.name}`);

  return null;
}
