import { NextResponse,NextRequest } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { serverId: string } }

) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    const { serverId } = params;
    if (!serverId)
      return new NextResponse("Server ID Missing", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        userId: { not: profile.id },
        members: { some: { userId: profile.id } }
      },
      data: { members: { deleteMany: { userId: profile.id } } }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVER_ID_LEAVE_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
