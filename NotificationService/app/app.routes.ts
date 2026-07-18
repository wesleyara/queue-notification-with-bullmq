import express from "express";

import { AppController } from "./app.controller";

const router = express.Router();

const appController = new AppController();

router.get("/", (req, res) => appController.getHealthcheck(req, res));
router.get("/notification", (req, res) => appController.postNotification(req, res));

export default router;
