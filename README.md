# Budget Manager API

A budget management API built using SOLID principles, Clean Architecture, Domain-Driven Design (DDD) and Domain Events.

This API allows users to manage financial categories, track transactions, set financial goals, and monitor account balances.

## 🛠️ Tech Stack
- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Domain Events System (Pub/Sub)
- SOLID Principles
- Clean Architecture
- Vitest (for testing)

## 🚀 Features
- User registration and authentication
- CRUD operations for categories
- Transaction management (expenses and incomes)
- Financial goals tracking
- Balance management (auto-updated via domain events)
- Domain Events system with Pub/Sub pattern
- Middleware for automatic event dispatching

## 📂 Project Structure
├── biome.json
├── docker-compose.yaml
├── package.json
├── pnpm-lock.yaml
├── prisma
│   ├── migrations
│   │   ├── 20250320232612_init_prisma
│   │   │   └── migration.sql
│   │   ├── 20250323155555_insert_new_model
│   │   │   └── migration.sql
│   │   ├── 20250323172118_insert_new_model
│   │   │   └── migration.sql
│   │   ├── 20250323233715_insert_new_models
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── README.md
├── src
│   ├── core
│   │   ├── entitites
│   │   │   ├── aggregate-root.ts
│   │   │   ├── entity.ts
│   │   │   └── unique-entity-id.ts
│   │   ├── events
│   │   │   ├── domain-events.ts
│   │   │   ├── domain-event.ts
│   │   │   └── event-handler.ts
│   │   └── types
│   │       ├── either.ts
│   │       └── express.d.ts
│   ├── domain
│   │   └── budget-manager
│   │       ├── application
│   │       │   ├── crypthography
│   │       │   │   ├── encrypter.ts
│   │       │   │   ├── hash-comparer.ts
│   │       │   │   └── hash-generator.ts
│   │       │   ├── repositories
│   │       │   │   ├── account-report-repository.ts
│   │       │   │   ├── balance-repository.ts
│   │       │   │   ├── category-repository.ts
│   │       │   │   ├── financial-goals-repository.ts
│   │       │   │   ├── transaction-repository.ts
│   │       │   │   └── user-repository.ts
│   │       │   ├── subscribers
│   │       │   │   ├── on-account-report-requested.spec.ts
│   │       │   │   ├── on-account-report-requested.ts
│   │       │   │   ├── on-transaction-created.spec.ts
│   │       │   │   ├── on-transaction-created.ts
│   │       │   │   ├── on-transaction-deleted.spec.ts
│   │       │   │   ├── on-transaction-deleted.ts
│   │       │   │   ├── on-use-created.spec.ts
│   │       │   │   └── on-user-created.ts
│   │       │   └── use-cases
│   │       │       ├── create-account-report-use-case.ts
│   │       │       ├── create-balance-use-case.spec.ts
│   │       │       ├── create-balance-use-case.ts
│   │       │       ├── create-category-use-case.spec.ts
│   │       │       ├── create-category-use-case.ts
│   │       │       ├── create-financial-goals-use-case.spec.ts
│   │       │       ├── create-financial-goals-use-case.ts
│   │       │       ├── create-session-to-user-use-case.spec.ts
│   │       │       ├── create-session-to-user-use-case.ts
│   │       │       ├── create-transaction-use-case.spec.ts
│   │       │       ├── create-transaction-use-case.ts
│   │       │       ├── create-user-use-case.spec.ts
│   │       │       ├── create-user-use-case.ts
│   │       │       ├── delete-category-use-case.spec.ts
│   │       │       ├── delete-category-use-case.ts
│   │       │       ├── delete-financial-goals-use-case.spec.ts
│   │       │       ├── delete-financial-goals-use-case.ts
│   │       │       ├── delete-transaction-use-case.spec.ts
│   │       │       ├── delete-transaction-use-case.ts
│   │       │       ├── errors
│   │       │       │   ├── amount-must-be-greater-than-0-error.ts
│   │       │       │   ├── category-not-found-error.ts
│   │       │       │   ├── date-cannot-be-greater-than-today-error.ts
│   │       │       │   ├── description-must-be-provided-error.ts
│   │       │       │   ├── goal-date-mut-be-greater-than-today-error.ts
│   │       │       │   ├── goal-value-must-be-greater-than-zero-error.ts
│   │       │       │   ├── invalid-balance-id-error.ts
│   │       │       │   ├── invalid-category-id-error.ts
│   │       │       │   ├── invalid-category-type-error.ts
│   │       │       │   ├── invalid-credentials-error.ts
│   │       │       │   ├── invalid-financial-goals-id-error.ts
│   │       │       │   ├── invalid-transaction-type-error.ts
│   │       │       │   ├── invalid-user-id-error.ts
│   │       │       │   ├── transaction-not-found-error.ts
│   │       │       │   └── user-already-exists-error.ts
│   │       │       ├── filter-transactions-use-case.ts
│   │       │       ├── filter-transaction-use-case.spec.ts
│   │       │       └── update-balance.ts
│   │       └── enterprise
│   │           ├── entities
│   │           │   ├── account-report.ts
│   │           │   ├── balance.ts
│   │           │   ├── category.ts
│   │           │   ├── financial-goals.ts
│   │           │   ├── transaction.ts
│   │           │   └── user.ts
│   │           └── events
│   │               ├── account-report-requested-event.ts
│   │               ├── transaction-created-event.ts
│   │               ├── transaction-deleted-event.ts
│   │               └── user-created-event.ts
│   └── infra
│       ├── app.ts
│       ├── cryptography
│       │   ├── bcyprt-hasher.ts
│       │   └── jwt-encrypter.ts
│       ├── database
│       │   └── mapper
│       │       ├── prisma-balance-mapper.ts
│       │       ├── prisma-category-mapper.ts
│       │       ├── prisma-financial-goals-mapper.ts
│       │       ├── prisma-transaction-mapper.ts
│       │       └── prisma-user-mapper.ts
│       ├── env
│       │   └── index.ts
│       ├── events
│       │   └── register-event-handlers
│       │       └── index.ts
│       ├── http
│       │   ├── app-test
│       │   │   ├── app-test-balance.ts
│       │   │   ├── app-test-category.ts
│       │   │   ├── app-test-financial-goals.ts
│       │   │   ├── app-test-register.ts
│       │   │   ├── app-test-session.ts
│       │   │   └── app-test-transaction.ts
│       │   ├── controller
│       │   │   ├── create-balance.controller.e2e-spec.ts
│       │   │   ├── create-balance.controller.ts
│       │   │   ├── create-category.controller.e2e-spec.ts
│       │   │   ├── create-category.controller.ts
│       │   │   ├── create-financial-goals.controller.e2e-spec.ts
│       │   │   ├── create-financial-goals.controller.ts
│       │   │   ├── create-session.controller.e2e-spec.ts
│       │   │   ├── create-session.controller.ts
│       │   │   ├── create-transaction.controller.e2e-spec.ts
│       │   │   ├── create-transaction.controller-spec.ts
│       │   │   ├── create-user.controller.e2e-spec.ts
│       │   │   ├── create-user.controller.ts
│       │   │   ├── delete-category.controller.e2e-spec.ts
│       │   │   ├── delete-category.controller.ts
│       │   │   ├── delete-financial-goals.controller.e2e-spec.ts
│       │   │   ├── delete-financial-goals.controller.ts
│       │   │   ├── delete-transaction.controller.e2e-spec.ts
│       │   │   ├── delete-transaction.controller.ts
│       │   │   ├── filter-transaction.controller.e2e-spec.ts
│       │   │   └── filter-transaction.controller.ts
│       │   ├── presenter
│       │   │   ├── category-presenter.ts
│       │   │   ├── financial-goals-presenter.ts
│       │   │   ├── transaction-presenter.ts
│       │   │   └── user-presenter.ts
│       │   └── router
│       │       ├── balance-router.ts
│       │       ├── category-router.ts
│       │       ├── financial-goals-router.ts
│       │       ├── index.ts
│       │       ├── transaction-router.ts
│       │       └── user-router.ts
│       ├── middlewares
│       │   ├── auth-middleware
│       │   │   └── auth-middleware.ts
│       │   └── dispatch-domain-events
│       │       └── index.ts
│       ├── prisma
│       │   ├── prisma.ts
│       │   └── repositories
│       │       ├── financial-goals-repository.ts
│       │       ├── prisma-balance-repository.ts
│       │       ├── prisma-category-repository.ts
│       │       ├── prisma-transactions-repository.ts
│       │       └── prisma-user-repository.ts
│       └── server.ts
├── test
│   ├── cryptography
│   │   ├── fake-encrypter.ts
│   │   └── fake-hasher.ts
│   ├── repositories
│   │   ├── in-memory-balance-repository.ts
│   │   ├── in-memory-category-repository.ts
│   │   ├── in-memory-financial-goals-repository.ts
│   │   ├── in-memory-transaction-repository.ts
│   │   └── in-memory-user-repository.ts
│   └── setup-e2e
│       └── setup-e2e.ts
├── tsconfig.json
├── vitest.config.e2e.ts
└── vitest.config.ts

## 🧪 Running Tests
The project uses Vitest for unit and integration tests.

```bash
pnpm test
```
Or for E2E tests:
```bash
pnpm test:e2e
```

## 🐳 Docker Support
You can spin up the database using Docker:
```bash
docker compose up -d
```

## 📦 How to Run Locally
1. Clone the repository: 
```bash
git clone https://github.com/gbnunes7/budget-manager-api.git
```
2. Install dependencies:
```bash
pnpm install
```
3. Set up your .env file
4. Generate Prisma Client
```bash
pnpm prisma generate
```
5. Run database migrations:
```bash
pnpm prisma migrate dev
```
6. Start the server:
```bash
pnpm dev
```

## ✨ Future Improvements

Financial reports and summaries

Admin dashboard

Email notifications on important events

Public API documentation (Swagger or Redoc)

## 👤 Author

Gabriel Melo
[GitHub](https://github.com/gbnunes7)
