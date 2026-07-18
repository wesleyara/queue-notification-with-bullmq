import type { Server as HttpServer } from "http";

import { Server, Socket } from "socket.io";

import { NotificationRepository } from "../prisma/notification.repository";

export interface NotificationDTO {
  id: string;
  title: null | string;
  message: string;
  recipient: string;
  read: boolean;
  createdAt: string;
}

let io: Server | undefined;

const recipientSockets = new Map<string, Set<string>>();

function addRecipientSocket(recipient: string, socketId: string) {
  const sockets = recipientSockets.get(recipient) ?? new Set<string>();
  sockets.add(socketId);
  recipientSockets.set(recipient, sockets);
}

function removeRecipientSocket(recipient: string, socketId: string) {
  const sockets = recipientSockets.get(recipient);
  if (!sockets) return;
  sockets.delete(socketId);
  if (sockets.size === 0) recipientSockets.delete(recipient);
}

function handleConnection(socket: Socket) {
  socket.on("register", ({ recipient }: { recipient: string }) => {
    if (!recipient) return;

    socket.data.recipient = recipient;
    socket.join(recipient);
    addRecipientSocket(recipient, socket.id);
  });

  socket.on(
    "get-notifications",
    async (
      { recipient }: { recipient: string },
      ack?: (response: { notifications: NotificationDTO[] }) => void,
    ) => {
      if (!recipient || !ack) return;

      const notifications = await NotificationRepository.findByRecipient(recipient);

      ack({
        notifications: notifications.map(notification => ({
          id: notification.id,
          title: notification.title,
          message: notification.message,
          recipient: notification.recipient,
          read: notification.read,
          createdAt: notification.createdAt.toISOString(),
        })),
      });
    },
  );

  socket.on(
    "mark-as-read",
    async (
      { recipient, ids }: { recipient: string; ids?: string[] },
      ack?: (response: { ok: true; updatedCount: number }) => void,
    ) => {
      if (!recipient) return;

      const result = await NotificationRepository.markAsRead(recipient, ids);

      ack?.({ ok: true, updatedCount: result.count });
    },
  );

  socket.on("disconnect", () => {
    const recipient = socket.data.recipient as string | undefined;
    if (recipient) removeRecipientSocket(recipient, socket.id);
  });
}

export function initSocket(httpServer: HttpServer): Server {
  io = new Server(httpServer, {
    cors: { origin: process.env.CORS_ORIGIN || "*" },
  });

  io.on("connection", handleConnection);

  return io;
}

export function getIO(): Server | undefined {
  return io;
}
