import { create } from "zustand";
import {   Channel, ChannelType,Server,Group } from "@prisma/client";

export type ModalType = | "createServer"
| "invite"
| "editServer"
| "members"
| "createChannel"
| "leaveServer"
| "deleteServer"
| "deleteChannel"
| "editChannel"
| "messageFile"
| "deleteMessage"
| "createGroup"
| "createEvent";


interface ModalData {
  server?: Server;
  group?: Group;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  serverId?: string;
  groupId?: string;
  onOpen: (type: ModalType, data?: ModalData,serverId?:string) => void;
  onClose: () => void;
}



export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data= {}, serverId, groupId?:string) => set({ isOpen: true, type, data, serverId, groupId }),
  onClose: () => set({ isOpen: false, type: null })
}));
