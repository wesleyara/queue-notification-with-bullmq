import "dotenv/config";
import cors from "cors";
import express from "express";
import http from "http";

import appRoutes from "./app.routes";
import { initSocket } from "./infra/socket/socket.service";

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  }),
);

app.use(express.json());

app.use("/api", appRoutes);

initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
