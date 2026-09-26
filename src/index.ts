import express from "express";
import { env } from "./config/env.js";
import { discoveryRouter } from "./routes/discoveryRoutes.js";

const app = express();

app.use(discoveryRouter);

app.get("/health", (_req, res) => {
  res.json({
    status: "ok"
  });
});

app.listen(env.PORT, () => {
  console.log(`Wayfarinook API listening on port ${env.PORT}`);
});