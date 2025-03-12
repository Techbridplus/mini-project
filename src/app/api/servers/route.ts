import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const user = await currentProfile();

    if (!user) return new NextResponse("Unauthorized", { status: 401 });
    
    if (!name || !imageUrl){
      return new NextResponse("Invalid data", { status: 400 });
    }

  
    const server = await db.server.create({
      data: {
        userId: user.id,
        name: name||"",
        imageUrl: imageUrl||"",
        inviteCode: uuidv4(),
        members: { create: [{ userId: user.id, role: MemberRole.ADMIN }] }
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query") || "";
    const user = await currentProfile();

    if (!user) return new NextResponse("Unauthorized", { status: 401 });
    

  
    const servers =  await db.server.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive", // Case-insensitive search
        },
      },
      include: {
        user: true, // Include user information if needed
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(servers);
  } catch (error) {
    console.error("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
