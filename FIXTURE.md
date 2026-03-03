# Test Fixture Documentation

This repository is a purpose-built test fixture for end-to-end testing of an automated profiler that detects AI coding tool configurations. It is a realistic pnpm + Turborepo monorepo with real working code, real configs, and **specific intentional misconfigurations** designed to validate detection rules.

---

## Repository Structure

```
taskflow/
├── apps/
│   ├── api/          — Express REST API (TypeScript, zod validation)
│   └── web/          — Next.js 14 App Router frontend (Tailwind CSS)
├── packages/
│   └── shared/       — Shared types, utilities, and constants (@taskflow/shared)
├── .claude/          — Claude Code configuration
├── .cursor/          — Cursor configuration
├── .github/          — GitHub Copilot configuration
├── .augment/         — Augment configuration
└── (root configs)    — pnpm-workspace.yaml, turbo.json, tsconfig.json, etc.
```

**52 files total** | **1,200+ lines of TypeScript** | **4 AI tool providers configured**

---

## AI Tool Configurations

### Claude Code

| File | Status | Notes |
|------|--------|-------|
| `CLAUDE.md` | Well-formed | 71-line project instruction file referencing real paths and conventions |
| `.claude/settings.json` | **Misconfigured** | Contains an empty `deny` array — see [Misconfiguration #1](#1-claude-code-empty-deny-array) |
| `.claude/commands/review.md` | Well-formed | Custom code review command |
| `.claude/rules/typescript.md` | Well-formed | TypeScript convention rules |
| `.mcp.json` | Well-formed | Two MCP servers (`filesystem`, `github`), both with valid `command` fields |

### Cursor

| File | Status | Notes |
|------|--------|-------|
| `.cursorrules` | Well-formed | 39-line rules file with TypeScript/React/API conventions |
| `.cursor/rules/api-conventions.mdc` | Well-formed | Scoped rule with frontmatter (`globs: apps/api/**/*.ts`, `alwaysApply: false`) |
| `.cursor/mcp.json` | **Misconfigured** | Contains an MCP server entry missing `command` — see [Misconfiguration #2](#2-cursor-mcp-server-missing-command) |
| `.cursorignore` | Well-formed | Standard ignore patterns |

### GitHub Copilot

| File | Status | Notes |
|------|--------|-------|
| `.github/copilot-instructions.md` | Well-formed | 32-line instruction file with project conventions |
| `.github/instructions/api.instructions.md` | Well-formed | Path-scoped instructions with `applyTo: "apps/api/**/*.ts"` frontmatter |
| `.github/workflows/copilot-setup-steps.yml` | **Misconfigured** | Workflow job missing `steps` — see [Misconfiguration #3](#3-copilot-setup-steps-missing-steps-key) |

### Augment

| File | Status | Notes |
|------|--------|-------|
| `.augment/rules/typescript.md` | Well-formed | 24-line TypeScript rules |
| `.augment/rules/testing.md` | Well-formed | Testing convention rules |
| `.augment/commands/deploy.md` | Well-formed | Deployment command with staging/production steps |
| `.augment/code_review_guidelines.yaml` | Well-formed | 4 review areas with paths and rules |
| `.augmentignore` | Well-formed | Standard ignore patterns |

---

## Intentional Misconfigurations

These are the specific issues the profiler should detect. Each is deliberately placed and must not be "fixed."

### 1. Claude Code — Empty Deny Array

**File:** `.claude/settings.json`

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(pnpm *)",
      "Read(*)"
    ],
    "deny": []
  }
}
```

**What's wrong:** The `deny` array is present but empty. A profiler rule should flag that the deny list contains no entries, meaning no tool actions are explicitly blocked.

**Expected detection:** The profiler should report that `.claude/settings.json` has a `permissions.deny` array that is empty (`[]`).

---

### 2. Cursor — MCP Server Missing `command`

**File:** `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    },
    "database": {
      "args": ["--host", "localhost"],
      "env": {
        "DB_URL": "postgres://localhost:5432/tasks"
      }
    }
  }
}
```

**What's wrong:** The `database` server entry has `args` and `env` but is missing the required `command` field (and has no `url` field either). This makes it an incomplete STDIO server definition — it looks like someone started configuring a database MCP server but forgot to specify what executable to run.

**Expected detection:** The profiler should report that `.cursor/mcp.json` contains an MCP server (`database`) that has recognized STDIO configuration keys (`args`, `env`) but is missing the required `command` field.

**Important edge case:** An empty object `{}` would NOT indicate a misconfigured server — it's just an empty/placeholder entry. The rule should only trigger when at least one recognized MCP key (`args`, `env`, `type`, `disabled`) is present without a `command` or `url`.

---

### 3. Copilot — Setup Steps Missing `steps` Key

**File:** `.github/workflows/copilot-setup-steps.yml`

```yaml
name: "Copilot Setup Steps"
on: workflow_dispatch

jobs:
  setup:
    runs-on: ubuntu-latest
    # NOTE: intentionally missing 'steps' key — this is a known misconfiguration
```

**What's wrong:** The `setup` job has `runs-on: ubuntu-latest` but no `steps` key. This is an invalid GitHub Actions workflow — every job requires a `steps` array. The workflow would fail if triggered.

**Expected detection:** The profiler should report that `.github/workflows/copilot-setup-steps.yml` contains a job (`setup`) that defines `runs-on` but is missing the required `steps` key.

---

## What Should NOT Be Flagged

The following are all well-formed and should pass validation:

- `.mcp.json` — Both `filesystem` and `github` servers have valid `command` fields
- `.augment/code_review_guidelines.yaml` — Valid structure with `version`, `description`, and `areas`
- `.cursor/rules/api-conventions.mdc` — Valid frontmatter with `description`, `globs`, `alwaysApply`
- `.github/instructions/api.instructions.md` — Valid frontmatter with `applyTo`
- All `*ignore` files — Standard ignore patterns
- All rules/instruction markdown files — Contain real, substantive content

---

## Running the Repo

If you need to verify the app code actually works:

```bash
pnpm install
pnpm dev        # API on :3001, Web on :3000
```

- `GET http://localhost:3001/api/health` — health check
- `GET http://localhost:3001/api/tasks` — list seeded tasks
- `GET http://localhost:3001/api/users` — list seeded users
- `http://localhost:3000` — Next.js frontend

The API comes pre-seeded with 3 tasks and 2 users. All CRUD operations work against the in-memory store.
