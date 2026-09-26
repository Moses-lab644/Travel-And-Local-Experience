import { Router } from "express";
import { z } from "zod";
import { findPlaceById } from "../services/discoveryService.js";

export const discoveryRouter = Router();

const paramsSchema = z.object({
  id: z.string().min(1, "id is required"),
});

discoveryRouter.get("/places/:id", (req, res) => {
  const parsed = paramsSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid request",
    });
  }

  const result = findPlaceById(parsed.data.id);

  if (!result.found) {
    return res.status(404).json({
      status: "error",
      message: "Place not found",
    });
  }

  return res.status(200).json({
    status: "ok",
    data: result.record,
  });
});