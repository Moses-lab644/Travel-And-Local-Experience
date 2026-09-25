import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"], {
    error: "NODE_ENV must be one of development/test/production",
  }),
  PORT: z.coerce
    .number({ error: "PORT must be a positive integer" })
    .int("PORT must be a positive integer")
    .positive("PORT must be a positive integer"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const messages = parsed.error.issues.map(
    (issue) => `${issue.path.join(".")}: ${issue.message}`
  );
  console.error("Invalid environment configuration:");
  messages.forEach((msg) => console.error(`  - ${msg}`));
  process.exit(1);
}

export const env = parsed.data;