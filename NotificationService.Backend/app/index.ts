import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import appRoutes from "./app.routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  }),
);

app.use(express.json());

app.use("/api", appRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
