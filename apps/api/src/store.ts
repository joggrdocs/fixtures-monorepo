import { Task, User } from "@taskflow/shared";
import { generateId } from "@taskflow/shared";

const tasks = new Map<string, Task>();
const users = new Map<string, User>();

// Seed some initial data
function seed() {
  const now = new Date().toISOString();

  const seedUsers: User[] = [
    {
      id: "user-1",
      name: "Alice Chen",
      email: "alice@taskflow.dev",
      avatarUrl: null,
      createdAt: now,
    },
    {
      id: "user-2",
      name: "Bob Martinez",
      email: "bob@taskflow.dev",
      avatarUrl: null,
      createdAt: now,
    },
  ];

  const seedTasks: Task[] = [
    {
      id: "task-1",
      title: "Set up CI/CD pipeline",
      description:
        "Configure GitHub Actions for automated builds, linting, and deployment to staging.",
      status: "in_progress",
      priority: "high",
      assigneeId: "user-1",
      tags: ["devops", "infrastructure"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "task-2",
      title: "Design task board UI",
      description:
        "Create wireframes and implement the drag-and-drop task board with columns for each status.",
      status: "todo",
      priority: "medium",
      assigneeId: "user-2",
      tags: ["frontend", "design"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "task-3",
      title: "Add email notifications",
      description:
        "Send email notifications when a task is assigned to a user or when a task status changes.",
      status: "todo",
      priority: "low",
      assigneeId: null,
      tags: ["backend", "notifications"],
      createdAt: now,
      updatedAt: now,
    },
  ];

  for (const user of seedUsers) {
    users.set(user.id, user);
  }
  for (const task of seedTasks) {
    tasks.set(task.id, task);
  }
}

seed();

export const taskStore = {
  getAll(): Task[] {
    return Array.from(tasks.values());
  },

  getById(id: string): Task | undefined {
    return tasks.get(id);
  },

  create(data: Omit<Task, "id" | "createdAt" | "updatedAt">): Task {
    const now = new Date().toISOString();
    const task: Task = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    tasks.set(task.id, task);
    return task;
  },

  update(id: string, data: Partial<Task>): Task | undefined {
    const existing = tasks.get(id);
    if (!existing) return undefined;
    const updated: Task = {
      ...existing,
      ...data,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };
    tasks.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    return tasks.delete(id);
  },
};

export const userStore = {
  getAll(): User[] {
    return Array.from(users.values());
  },

  getById(id: string): User | undefined {
    return users.get(id);
  },

  getByEmail(email: string): User | undefined {
    return Array.from(users.values()).find((u) => u.email === email);
  },

  create(data: Omit<User, "id" | "createdAt">): User {
    const user: User = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    users.set(user.id, user);
    return user;
  },
};
