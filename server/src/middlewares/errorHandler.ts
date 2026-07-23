import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error("Unhandled Error Exception", { error: err?.message, stack: err?.stack });

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    }
  });
};
