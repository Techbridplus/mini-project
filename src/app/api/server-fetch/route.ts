import { NextResponse } from "next/server";
import { Server } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const limit = 10;
export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");

    let servers: Server[] = [];

    if(cursor){
      servers = await db.server.findMany({
        take: limit,
        skip: 1,
        cursor: {
          id: cursor
        },
        orderBy: { createdAt: "desc" }
      });
    } else {
      servers = await db.server.findMany({
        take: limit,
        orderBy: { createdAt: "desc" }
      });
    }
    
    let nextCursor = null;

    if (servers.length === limit) {
      nextCursor = servers[servers.length - 1].id;
    }
    return NextResponse.json({ items: servers, nextCursor });

  } catch (error) {
    console.error("[SERVER_GET]", error);
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}
