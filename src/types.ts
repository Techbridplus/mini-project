import { Member, User, Server } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { user: User })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & { server: NetServer & { io: SocketIOServer } };
};
export type IPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};