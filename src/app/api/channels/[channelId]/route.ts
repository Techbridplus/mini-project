import { NextResponse,NextRequest } from "next/server";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const searchParams = request.nextUrl.searchParams;
    const groupId = searchParams.get("groupId");
    const channelId = searchParams.get("channelId");
    if (!groupId)
      return new NextResponse("Group ID Missing", { status: 400 });
    if (!channelId)
      return new NextResponse("Channel ID Missing", { status: 400 });
    console.log("request",request);
    const { name, type } = await request.json();
    if (!name || !type || name === "general")
      return new NextResponse("Name / Type cannot be empty or general", {
        status: 400
      });

    const server = await db.group.update({
      where: {
        id: groupId
      },
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
              NOT: {
                name: "general"
              }
            },
            data: {
              name,
              type
            }
          }
        }
      }
    });
    console.log('channelId',channelId);
    console.log('groupId',groupId);

    return NextResponse.json(server);
  } catch (error) {
    console.error("[CHANNEL_ID_PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest
) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const searchParams = request.nextUrl.searchParams;
    const groupId = searchParams.get("groupId");
    const channelId = searchParams.get("channelId");
    if (!groupId)
      return new NextResponse("Group ID Missing", { status: 400 });
    if (!channelId)
      return new NextResponse("Channel ID Missing", { status: 400 });

    const server = await db.group.update({
      where: {
        id: groupId,
      },
      data: {
        channels: {
          delete: {
            id: channelId,
            name: {
              not: "general"
            }
          }
        }
      }
    });
    return NextResponse.json(server);
  } catch (error) {
    console.error("[CHANNEL_ID_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
