import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, imageUrl,serverId} = await req.json();
    const user = await currentProfile();

    if (!user) return new NextResponse("Unauthorized", { status: 401 });
    if (!name || !imageUrl) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    // console.log("name ", name);
    // console.log("imageUrl ", imageUrl);
    const group = await db.group.create({
      data: {
        userId: user.id,
        name: name||"",
        logoUrl: imageUrl||"",
        serverId:serverId||"",
        channels: { create: [{ name: "general"}] },
        // inviteCode: uuidv4(),
        // members: { create: [{ userId: user.id, role: MemberRole.ADMIN }] }
      }
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error("[GROUPS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
