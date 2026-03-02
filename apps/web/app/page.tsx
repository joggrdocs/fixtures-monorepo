import Link from "next/link";
import { TASK_STATUSES, getStatusLabel } from "@taskflow/shared";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Welcome to TaskFlow
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          A simple, fast task management platform for small teams. Track work,
          collaborate with your team, and ship on time.
        </p>
        <div className="mt-8">
          <Link
            href="/tasks"
            className="inline-flex items-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors"
          >
            View Tasks
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {TASK_STATUSES.filter((s) => s !== "archived").map((status) => (
          <div
            key={status}
            className="rounded-lg border border-gray-200 bg-white p-6 text-center"
          >
            <p className="text-sm font-medium text-gray-500">
              {getStatusLabel(status)}
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">—</p>
          </div>
        ))}
      </section>
    </div>
  );
}
