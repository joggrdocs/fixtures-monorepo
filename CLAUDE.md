# TaskFlow — Claude Code Instructions

## Project Overview

TaskFlow is a task management platform built as a pnpm monorepo with Turborepo. It consists of an Express REST API, a Next.js frontend, and a shared package for types and utilities.

## Tech Stack

- **Runtime**: Node.js 20+
- **Package manager**: pnpm 9.x with workspace protocol
- **Build orchestration**: Turborepo
- **API**: Express 4 + TypeScript, zod for validation
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Shared**: Pure TypeScript library with types, utils, and constants

## Key Commands

```bash
pnpm install          # Install all dependencies
pnpm dev              # Start API (port 3001) and web (port 3000) in parallel
pnpm build            # Build all packages (respects dependency graph)
pnpm typecheck        # Type-check all packages
pnpm lint             # Lint all packages
```

## Coding Conventions

- TypeScript strict mode is enabled across all packages
- Prefer functional patterns: pure functions, immutable data, avoid classes where possible
- Use `const` by default. Only use `let` when mutation is genuinely needed
- All API route handlers must validate input using zod schemas
- All API responses follow the `ApiResponse<T>` shape from `@taskflow/shared`
- Use named exports, not default exports (except for Next.js pages and Express routers)
- Import shared types from `@taskflow/shared`, never duplicate type definitions

## Architecture

```
apps/api/src/
  index.ts            — Express app setup and middleware
  store.ts            — In-memory data store (Map-based)
  types.ts            — API-specific types (error handling)
  routes/tasks.ts     — CRUD routes for tasks
  routes/users.ts     — CRUD routes for users
  routes/health.ts    — Health check endpoint
  middleware/          — Express middleware (error handler, etc.)

apps/web/
  app/                — Next.js App Router pages
  components/         — React components
  lib/api.ts          — API client for the Express backend

packages/shared/src/
  types.ts            — Domain types (Task, User, etc.)
  utils.ts            — Utility functions (slugify, formatDate, etc.)
  constants.ts        — Shared constants and enums
```

## Important Patterns

- The API uses an in-memory store (`Map`) — do not add database dependencies
- Error handling goes through the centralized `errorHandler` middleware
- The web app uses server components by default; add "use client" only when needed
- Shared package uses `workspace:*` protocol and is transpiled by Next.js

## When Making Changes

- Run `pnpm typecheck` before committing to catch type errors across packages
- If you modify `@taskflow/shared`, check both `apps/api` and `apps/web` for breakage
- Keep API response shapes consistent — always wrap in `{ data, meta? }`
- Do not introduce external databases or ORMs — the in-memory store is intentional
