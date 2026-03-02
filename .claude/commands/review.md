Review the current changes for code quality, correctness, and adherence to project conventions.

## Steps

1. Run `git diff` to see what has changed
2. For each changed file, check:
   - TypeScript strict mode compliance (no `any`, no implicit returns)
   - Consistent use of `@taskflow/shared` types — no duplicated interfaces
   - API routes: input validation with zod, consistent error responses
   - React components: proper use of server vs client components
   - Import paths use the workspace package name, not relative paths across packages
3. Run `pnpm typecheck` to verify the full project compiles
4. Flag any issues found with file path, line number, and suggested fix
5. If everything looks good, confirm the changes are ready to commit
