import { api } from "../../lib/api";
import { TaskList } from "../../components/task-list";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  let tasks;
  let error: string | null = null;

  try {
    const response = await api.getTasks();
    tasks = response.data;
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load tasks";
    tasks = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track your team&apos;s work
          </p>
        </div>
        <button
          className="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Task
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <TaskList tasks={tasks} />
    </div>
  );
}
