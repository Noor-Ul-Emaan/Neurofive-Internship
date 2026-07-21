# Week 5 Task 1 - Testing Across the Stack

Automated full-stack testing suite including Backend API unit/integration tests, Frontend React component tests, and Cypress End-to-End (E2E) testing.

## Test Suites

1. **Backend Tests (5 Jest + Supertest Tests):**
   - GET `/api/health` status check
   - GET `/api/items` fetch check
   - POST `/api/items` valid item creation
   - POST `/api/items` validation error handling
   - GET `/api/items/:id` 404 error check

2. **Frontend Tests (5 Vitest + React Testing Library Tests):**
   - Component rendering
   - Initial empty state message
   - Empty input form validation
   - Item addition user interaction
   - Input field reset after submission

3. **E2E Test (Cypress):**
   - End-to-end user flow: Page load -> Validation trigger -> Valid item creation -> DOM verification

## How to Run Tests

### 1. Run Backend Tests
```bash
npm run test:backend