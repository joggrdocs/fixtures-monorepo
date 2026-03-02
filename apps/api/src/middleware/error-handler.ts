import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../types";
import { ApiError } from "@taskflow/shared";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response<ApiError>,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    const details: Record<string, string[]> = {};
    for (const issue of err.issues) {
      const path = issue.path.join(".");
      if (!details[path]) details[path] = [];
      details[path].push(issue.message);
    }

    res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "Request validation failed",
      statusCode: 400,
      details,
    });
    return;
  }

  if ((err as AppError).statusCode) {
    const appErr = err as AppError;
    res.status(appErr.statusCode).json({
      error: "APP_ERROR",
      message: appErr.message,
      statusCode: appErr.statusCode,
      details: appErr.details,
    });
    return;
  }

  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "INTERNAL_ERROR",
    message: "An unexpected error occurred",
    statusCode: 500,
  });
}
