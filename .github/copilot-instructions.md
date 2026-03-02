## TaskFlow — Copilot Instructions

This is a pnpm monorepo managed by Turborepo for a task management platform.

### Packages
- `apps/api` — Express REST API with TypeScript and zod validation
- `apps/web` — Next.js 14 App Router frontend with Tailwind CSS
- `packages/shared` — Shared types, utilities, and constants

### Coding Standards

**TypeScript**
- Strict mode is enabled. Never use `any`, `@ts-ignore`, or `@ts-expect-error`.
- Use `interface` for object shapes and `type` for unions/intersections.
- All public functions must have explicit parameter and return types.
- Prefer immutable patterns: `const`, `readonly`, spread over mutation.

**React**
- Server components are the default. Only use "use client" for interactive components.
- Import domain types from `@taskflow/shared`, never define them locally.
- Use Tailwind utility classes for all styling. No CSS modules or styled-components.

**API**
- Validate all request bodies with zod schemas defined at the top of route files.
- Use the `ApiResponse<T>` wrapper for all responses.
- Handle errors through the centralized `errorHandler` middleware.
- Keep route files focused — one resource per file.

### Architecture Notes
- The API uses in-memory storage (no database). This is intentional.
- Shared package is referenced via `workspace:*` and transpiled by Next.js.
- Run `pnpm typecheck` to verify types across all packages.
