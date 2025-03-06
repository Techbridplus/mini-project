import { NextResponse,NextRequest } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
export async function PATCH(
  request: NextRequest,

) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    const {  serverId } = await request.json();
    // const searchParams = request.nextUrl.searchParams;
    // const serverId = searchParams.get("serverId");
    if (!serverId) return new NextResponse("Server ID Missing", { status: 400 });
    const member = await db.member.create({
      data: {
        userId: profile.id,
        serverId: serverId,
        role: MemberRole.GUEST, // or any other role you want to assign
      },
    });
    console.log("serverId",serverId);

    return NextResponse.json("server");
  } catch (error) {
    console.error("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}