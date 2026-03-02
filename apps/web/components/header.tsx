import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-sm">
            TF
          </div>
          <span className="text-lg font-semibold text-gray-900">TaskFlow</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/tasks"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Tasks
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">AC</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
