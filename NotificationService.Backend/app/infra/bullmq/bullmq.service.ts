import { ConnectionOptions, Job, Queue, Worker } from "bullmq";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
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

    writeNotificationToFile(message, recipient, title);
    return "Notification sent successfully";
  },
  { connection },
);

function writeNotificationToFile(message: string, recipient: string, title?: string) {
  const notificationsDir = path.join(__dirname, "../../../notifications");
  if (!fs.existsSync(notificationsDir)) {
    fs.mkdirSync(notificationsDir);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `notification-${timestamp}.log`;
  const filePath = path.join(notificationsDir, filename);

  const content = `Recipient: ${recipient}\n${title ? `Title: ${title}\n` : ""}Message: ${message}\nTimestamp: ${new Date().toISOString()}`;

  fs.writeFileSync(filePath, content);
}
