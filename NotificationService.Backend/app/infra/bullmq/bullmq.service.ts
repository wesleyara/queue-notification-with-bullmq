import { ConnectionOptions, Job, Queue, Worker } from "bullmq";
import dotenv from "dotenv";

import { prisma } from "../prisma/prisma.service";
import { getIO } from "../socket/socket.service";
dotenv.config();

export const connection: ConnectionOptions = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT!),
  password: process.env.REDIS_PASSWORD,
};

const notificationKey = "ocr_notification";

export const notificationQueue = new Queue(notificationKey, { connection });

export const notificationWorker = new Worker(
  notificationKey,
  async (job: Job) => {
    const { title, message, recipient } = job.data;
    console.log(`Sending notification to ${recipient}: ${title ? `[${title}] ` : ""}${message}`);

    const notification = await prisma.notification.create({
      data: {
        title: title || null,
        message,
        recipient,
      },
    });

    getIO()?.to(recipient).emit("new-notification", {
      id: notification.id,
      title: notification.title,
      message: notification.message,
      recipient: notification.recipient,
      read: notification.read,
      createdAt: notification.createdAt.toISOString(),
    });

    return "Notification sent successfully";
  },
  { connection },
);
