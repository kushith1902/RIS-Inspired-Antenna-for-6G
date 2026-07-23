import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/logger";

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});

prisma.$connect()
  .then(() => logger.info("Database connected successfully via Prisma"))
  .catch((err) => logger.error("Database connection failed", err));
