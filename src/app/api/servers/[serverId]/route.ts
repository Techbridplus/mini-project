import { NextResponse,NextRequest } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
    { params }: { params: { serverId: string } }

) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await request.json();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    const searchParams = request.nextUrl.searchParams;
    const {serverId} = params;
    if (!serverId) return new NextResponse("Server ID Missing", { status: 400 });
    const server = await db.server.update({
      where: { id: serverId, userId: profile.id },
      data: { name, imageUrl }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    const searchParams = request.nextUrl.searchParams;
    const {serverId} = params;
    if (!serverId)
      return new NextResponse("Server ID Missing", { status: 400 });

    const server = await db.server.delete({
      where: { id: serverId, userId: profile.id }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVER_ID_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    if(!profile) return new NextResponse("Unauthorized", { status: 401 });
    const {serverId} = params;
    if (!serverId) return new NextResponse("Server ID Missing", { status: 400 });

    const server = await db.server.findFirst({
      where: { id: serverId, userId: profile.id },
      include: { groups: true }
    });

    if (!server) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVER_ID_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}