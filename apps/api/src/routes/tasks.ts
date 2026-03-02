import { Router, Request, Response } from "express";
import { z } from "zod";
import { TaskStatus, TaskPriority, ApiResponse, Task } from "@taskflow/shared";
import { DEFAULT_PAGE_SIZE } from "@taskflow/shared";
import { taskStore } from "../store";
import { createAppError } from "../types";

const router = Router();

const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(5000).default(""),
  priority: z
    .enum(["low", "medium", "high", "urgent"] as const)
    .default("medium"),
  assigneeId: z.string().nullable().optional().default(null),
  tags: z.array(z.string().max(50)).max(10).default([]),
});

const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).optional(),
  status: z.enum(["todo", "in_progress", "done", "archived"] as const).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"] as const).optional(),
  assigneeId: z.string().nullable().optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
});

// GET /api/tasks
router.get("/", (req: Request, res: Response<ApiResponse<Task[]>>) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const perPage = Math.min(
    100,
    Math.max(1, parseInt(req.query.perPage as string) || DEFAULT_PAGE_SIZE)
  );

  let tasks = taskStore.getAll();

  // Filter by status
  const status = req.query.status as TaskStatus | undefined;
  if (status) {
    tasks = tasks.filter((t) => t.status === status);
  }

  // Filter by priority
  const priority = req.query.priority as TaskPriority | undefined;
  if (priority) {
    tasks = tasks.filter((t) => t.priority === priority);
  }

  // Filter by assignee
  const assigneeId = req.query.assigneeId as string | undefined;
  if (assigneeId) {
    tasks = tasks.filter((t) => t.assigneeId === assigneeId);
  }

  // Search by title
  const search = req.query.search as string | undefined;
  if (search) {
    const lower = search.toLowerCase();
    tasks = tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(lower) ||
        t.description.toLowerCase().includes(lower)
    );
  }

  // Sort by updatedAt descending
  tasks.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const total = tasks.length;
  const start = (page - 1) * perPage;
  const paginated = tasks.slice(start, start + perPage);

  res.json({
    data: paginated,
    meta: { total, page, perPage },
  });
});

// GET /api/tasks/:id
router.get("/:id", (req: Request, res: Response) => {
  const task = taskStore.getById(req.params.id);
  if (!task) {
    throw createAppError("Task not found", 404);
  }
  res.json({ data: task });
});

// POST /api/tasks
router.post("/", (req: Request, res: Response) => {
  const input = createTaskSchema.parse(req.body);

  const task = taskStore.create({
    title: input.title,
    description: input.description,
    status: "todo",
    priority: input.priority,
    assigneeId: input.assigneeId,
    tags: input.tags,
  });

  res.status(201).json({ data: task });
});

// PATCH /api/tasks/:id
router.patch("/:id", (req: Request, res: Response) => {
  const existing = taskStore.getById(req.params.id);
  if (!existing) {
    throw createAppError("Task not found", 404);
  }

  const input = updateTaskSchema.parse(req.body);
  const updated = taskStore.update(req.params.id, input);

  res.json({ data: updated });
});

// DELETE /api/tasks/:id
router.delete("/:id", (req: Request, res: Response) => {
  const existed = taskStore.delete(req.params.id);
  if (!existed) {
    throw createAppError("Task not found", 404);
  }
  res.status(204).send();
});

export default router;
