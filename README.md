# TaskFlow

A task management platform built as a pnpm monorepo with Turborepo.

## Packages

| Package | Description |
|---------|-------------|
| `apps/api` | Express REST API for task management |
| `apps/web` | Next.js frontend (App Router) |
| `packages/shared` | Shared types, utilities, and constants |

## Getting Started

```bash
pnpm install
pnpm dev
```

The API runs on `http://localhost:3001` and the web app on `http://localhost:3000`.

## Scripts

- `pnpm build` — Build all packages
- `pnpm dev` — Start all packages in development mode
- `pnpm lint` — Lint all packages
- `pnpm typecheck` — Type-check all packages
- `pnpm clean` — Clean build artifacts

## Architecture

The API provides a RESTful interface for managing tasks and users. Data is stored in-memory for development. The web frontend consumes the API and renders task boards and detail views.

Shared domain types and utility functions live in `packages/shared` and are imported by both apps as `@taskflow/shared`.
