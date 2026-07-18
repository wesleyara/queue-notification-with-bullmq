import { ConnectionOptions, Job, Queue, Worker } from "bullmq";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import { prisma } from "../prisma/prisma.service";
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

    await prisma.notification.create({
      data: {
        title: title || null,
        message,
        recipient,
      },
    });

    // TODO: implement this

    return "Notification sent successfully";
  },
  { connection },
);
