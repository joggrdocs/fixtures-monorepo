## Testing Conventions

### General Approach
- Use Vitest as the test runner for all packages.
- Co-locate test files next to the source files with a `.test.ts` suffix.
- Test behavior, not implementation details. Focus on inputs and outputs.

### API Testing
- Use `supertest` to test Express route handlers.
- Test the full request/response cycle, including validation errors.
- Seed test data before each test, reset after.
- Assert on response status codes, body shape, and specific field values.

### Shared Package Testing
- Unit test all utility functions with edge cases.
- Test type guards with both matching and non-matching inputs.
- Keep tests fast — no I/O, no timers, no network calls.

### Frontend Testing
- Use React Testing Library for component tests.
- Test user-visible behavior: rendered text, interactions, navigation.
- Mock the API client (`lib/api.ts`) in component tests.
- Do not test implementation details like state values or internal method calls.

### Naming
- Describe blocks should name the unit under test.
- Test names should describe the expected behavior: "returns empty array when no tasks match".
