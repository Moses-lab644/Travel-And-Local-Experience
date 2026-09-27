import express from "express";
import { discoveryRouter } from "./routes/discoveryRoutes.js";

export const app = express();

app.use(discoveryRouter);

app.get("/health", (_req, res) => {
  res.json({
    status: "ok"
  });
});