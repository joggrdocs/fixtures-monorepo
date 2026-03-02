import { Request, Response, NextFunction } from "express";

export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export interface AppError extends Error {
  statusCode: number;
  details?: Record<string, string[]>;
}

export function createAppError(
  message: string,
  statusCode: number,
  details?: Record<string, string[]>
): AppError {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.details = details;
  return error;
}
