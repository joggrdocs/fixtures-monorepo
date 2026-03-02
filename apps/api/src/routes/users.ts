import { Router, Request, Response } from "express";
import { z } from "zod";
import { ApiResponse, User } from "@taskflow/shared";
import { isValidEmail } from "@taskflow/shared";
import { userStore } from "../store";
import { createAppError } from "../types";

const router = Router();

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z
    .string()
    .min(1, "Email is required")
    .refine(isValidEmail, "Invalid email format"),
  avatarUrl: z.string().url().nullable().optional().default(null),
});

// GET /api/users
router.get("/", (_req: Request, res: Response<ApiResponse<User[]>>) => {
  const users = userStore.getAll();
  res.json({
    data: users,
    meta: { total: users.length },
  });
});

// GET /api/users/:id
router.get("/:id", (req: Request, res: Response) => {
  const user = userStore.getById(req.params.id);
  if (!user) {
    throw createAppError("User not found", 404);
  }
  res.json({ data: user });
});

// POST /api/users
router.post("/", (req: Request, res: Response) => {
  const input = createUserSchema.parse(req.body);

  const existing = userStore.getByEmail(input.email);
  if (existing) {
    throw createAppError("A user with this email already exists", 409);
  }

  const user = userStore.create({
    name: input.name,
    email: input.email,
    avatarUrl: input.avatarUrl,
  });

  res.status(201).json({ data: user });
});

export default router;
