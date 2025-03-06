import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);

    const groupId = searchParams.get("groupId");

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (!groupId)
      return new NextResponse("Group ID is Missing", { status: 400 });

    if (name === "general")
      return new NextResponse("Name cannot be 'general'", { status: 400 });

    const group = await db.group.update({
      where: {
        id: groupId,
      },
      data: {
        channels: {
          create: {
            name,
            type
          }
        }
      }
    });
    console.log("req", req);

    return NextResponse.json("group");
  } catch (error) {
    console.error("[CHANNELS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
