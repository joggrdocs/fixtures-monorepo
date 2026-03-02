---
applyTo: "apps/api/**/*.ts"
---

## API Development Instructions

When working in the API package (`apps/api`):

### Route Handlers
- Every route file exports a default `Router` instance
- Define zod schemas at the top of the file for request validation
- Use `createAppError(message, statusCode)` for error responses
- Always return `{ data: T, meta?: {...} }` shaped responses

### Data Access
- Use `taskStore` and `userStore` from `../store`
- Always check for `undefined` when fetching by ID
- The store handles ID generation and timestamps automatically

### Adding New Routes
1. Create a new file in `src/routes/`
2. Define the router and schemas
3. Register the router in `src/index.ts` with the appropriate path prefix
4. Import types from `@taskflow/shared`
