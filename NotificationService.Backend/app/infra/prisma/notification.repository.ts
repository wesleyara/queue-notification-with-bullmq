import { prisma } from "./prisma.service";

export const NotificationRepository = {
  findByRecipient(recipient: string) {
    return prisma.notification.findMany({
      where: { recipient },
      orderBy: { createdAt: "desc" },
    });
  },

  markAsRead(recipient: string, ids?: string[]) {
    return prisma.notification.updateMany({
      where: {
        recipient,
        read: false,
        ...(ids && ids.length ? { id: { in: ids } } : {}),
      },
      data: { read: true },
    });
  },
};
