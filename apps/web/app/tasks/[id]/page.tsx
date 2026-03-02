import Link from "next/link";
import { api } from "../../../lib/api";
import {
  getStatusLabel,
  getPriorityLabel,
  formatDate,
  STATUS_COLORS,
  PRIORITY_COLORS,
} from "@taskflow/shared";

export const dynamic = "force-dynamic";

export default async function TaskDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let task;
  let error: string | null = null;

  try {
    const response = await api.getTask(params.id);
    task = response.data;
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load task";
  }

  if (error || !task) {
    return (
      <div className="space-y-4">
        <Link
          href="/tasks"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to tasks
        </Link>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-800">
            Task not found
          </h2>
          <p className="mt-1 text-sm text-red-700">
            {error ?? "The requested task could not be loaded."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/tasks"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        <svg
          className="mr-1 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to tasks
      </Link>

      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
            <p className="text-sm text-gray-500">
              Created {formatDate(task.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white"
              style={{ backgroundColor: STATUS_COLORS[task.status] }}
            >
              {getStatusLabel(task.status)}
            </span>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white"
              style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
            >
              {getPriorityLabel(task.priority)}
            </span>
          </div>
        </div>

        {task.description && (
          <div className="mt-6">
            <h2 className="text-sm font-medium text-gray-700">Description</h2>
            <p className="mt-2 text-gray-600 whitespace-pre-wrap">
              {task.description}
            </p>
          </div>
        )}

        {task.tags.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-medium text-gray-700">Tags</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-gray-100 pt-4">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-500">Last updated</dt>
              <dd className="mt-1 font-medium text-gray-900">
                {formatDate(task.updatedAt)}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Assignee</dt>
              <dd className="mt-1 font-medium text-gray-900">
                {task.assigneeId ?? "Unassigned"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
