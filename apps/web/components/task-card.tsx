import Link from "next/link";
import {
  Task,
  getStatusLabel,
  getPriorityLabel,
  formatRelativeTime,
  truncate,
  STATUS_COLORS,
  PRIORITY_COLORS,
} from "@taskflow/shared";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 text-sm text-gray-500">
              {truncate(task.description, 120)}
            </p>
          )}
        </div>
        <span
          className="inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium text-white"
          style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
        >
          {getPriorityLabel(task.priority)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white"
            style={{ backgroundColor: STATUS_COLORS[task.status] }}
          >
            {getStatusLabel(task.status)}
          </span>
          {task.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 2 && (
            <span className="text-xs text-gray-400">
              +{task.tags.length - 2}
            </span>
          )}
        </div>
        <span className="text-xs text-gray-400">
          {formatRelativeTime(task.updatedAt)}
        </span>
      </div>
    </Link>
  );
}
