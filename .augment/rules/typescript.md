## TypeScript Conventions

### General
- TypeScript strict mode is enabled in all packages. Do not weaken it.
- Use `interface` for object shapes, `type` for unions, intersections, and mapped types.
- Explicitly type all function parameters and return values for public APIs.
- Never use `any`. Use `unknown` and narrow with type guards when the type is uncertain.
- Prefer `const` assertions for literal values: `as const`.

### Functions
- Keep functions pure where possible — no side effects, no mutation of inputs.
- Use early returns to reduce nesting and improve readability.
- Destructure parameters when a function takes more than two arguments.
- Prefer arrow functions for callbacks. Use `function` declarations for top-level exports.

### Imports
- Import shared types from `@taskflow/shared` — never duplicate type definitions.
- Use named exports from the shared package. Default exports are only for Next.js pages and Express routers.
- Group imports: external packages first, then workspace packages, then relative imports.

### Error Handling
- Use the `createAppError` helper in the API for known error conditions.
- Let zod validation errors propagate to the global error handler.
- In React components, handle errors with error boundaries or try/catch in server components.
