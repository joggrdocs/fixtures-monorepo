import { TaskStatus, TaskPriority } from "./types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const API_ROUTES = {
  tasks: "/api/tasks",
  users: "/api/users",
  health: "/api/health",
} as const;

export const TASK_STATUSES: TaskStatus[] = [
  "todo",
  "in_progress",
  "done",
  "archived",
];

export const TASK_PRIORITIES: TaskPriority[] = [
  "low",
  "medium",
  "high",
  "urgent",
];

export const STATUS_COLORS: Record<TaskStatus, string> = {
  todo: "#6b7280",
  in_progress: "#3b82f6",
  done: "#22c55e",
  archived: "#9ca3af",
};

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  low: "#6b7280",
  medium: "#eab308",
  high: "#f97316",
  urgent: "#ef4444",
};

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_TITLE_LENGTH = 200;
export const MAX_DESCRIPTION_LENGTH = 5000;
