## TypeScript Rules

- Always use strict mode. Never disable strict checks or use `@ts-ignore`.
- Prefer `interface` over `type` for object shapes. Use `type` for unions and intersections.
- All function parameters and return types should be explicitly typed. Do not rely on inference for public APIs.
- Never use `any`. Use `unknown` if the type is truly not known, then narrow it.
- Use `as const` for literal objects and arrays that should not be widened.
- Prefer `readonly` for arrays and properties that should not be mutated after creation.
- Destructure function parameters when there are more than two.
- Use early returns to reduce nesting in functions.
