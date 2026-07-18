import { Request, Response } from "express";

import { AppService } from "./app.service";
import { notificationQueue } from "./infra/bullmq/bullmq.service";

export class AppController {
  constructor(private readonly appService = new AppService()) {}

  getHealthcheck(req: Request, res: Response) {
    try {
      const healthcheck = this.appService.getHealthcheck();

      return res.status(healthcheck.status).json(healthcheck);
    } catch (error) {
      const errorWrapper = error as Error;

      return res.status(500).json({
        status: 500,
        date: new Date(),
        message: errorWrapper.message || "Internal Server Error",
      });
    }
  }

  async postNotification(req: Request, res: Response) {
    try {
      const { message, recipient } = req.query;

      if (!message || !recipient) {
        return res.status(400).json({
          status: 400,
          date: new Date(),
          message: "Missing required fields: message and recipient",
        });
      }

      await notificationQueue.add("send-notification", {
        message,
        recipient,
      });

      return res.status(200).json({
        status: 200,
        date: new Date(),
        message: "Notification sent successfully",
      });
    } catch (error) {
      const errorWrapper = error as Error;

      return res.status(500).json({
        status: 500,
        date: new Date(),
        message: errorWrapper.message || "Internal Server Error",
      });
    }
  }
}
