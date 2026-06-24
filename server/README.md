# Server

Serverless (AWS Lambda) backend for the web-socket chat app, written in TypeScript with Prisma + MongoDB. Auth endpoints (register/login) issue JWT access/refresh tokens. 

## Stack

- **Runtime:** AWS Lambda (Node.js 18.x) via the [Serverless Framework](https://www.serverless.com/) + `serverless-offline` for local dev
- **Database:** MongoDB, accessed through [Prisma](https://www.prisma.io/)
- **Validation:** Zod
- **Auth:** `jsonwebtoken` (access + refresh tokens), `bcrypt` for password hashing

## Project structure

```
server/
├── handlers/                  # Lambda entry points (one file per function)
│   ├── register.ts
│   └── login.ts
├── prisma/
│   └── schema.prisma          # User / Chat / ChatUser / Message models
├── prisma.config.ts           # Prisma config (loads DATABASE_URL from .env)
├── src/
│   ├── modules/users/         # controller / service / schema for auth
│   ├── utils/                 # hash.ts, response.ts helpers
│   └── generated/prisma/      # generated Prisma client (gitignored)
├── serverless.yml             # Lambda functions, routes, env vars
└── package.json
```

## Prerequisites

- Node.js 18+
- A MongoDB connection string (e.g. MongoDB Atlas)

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

Create a `.env` file in `server/` (it's gitignored):

```env
DATABASE_URL="mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority"
JWT_SECRET="your-access-token-secret"
JWT_REFRESH_SECRET="your-refresh-token-secret"
```

These are read by `prisma.config.ts` (for Prisma CLI commands) and injected into the Lambda environment by `serverless-dotenv-plugin` (see `serverless.yml`).

## 3. Prisma commands

The schema uses the `mongodb` provider, so there are no SQL migrations — use `db push` to sync the schema instead of `migrate dev`.

```bash
# Generate the Prisma Client into src/generated/prisma (matches schema.prisma `output`)
npx prisma generate

# Push the schema.prisma models to your MongoDB database
npx prisma db push

# Open Prisma Studio to browse/edit data
npx prisma studio

# Re-run generate after any change to prisma/schema.prisma
npx prisma generate
```

> Run `npx prisma generate` once after `npm install` and again any time `prisma/schema.prisma` changes — the generated client in `src/generated/prisma` is gitignored and required for the app to build/run.

## 4. Run locally

```bash
npm run dev
```

This runs `serverless offline`, which emulates API Gateway + Lambda locally. By default it listens on `http://localhost:3000` (see terminal output for the exact port/routes).

Other scripts:

```bash
npm run build    # tsc type-check / compile
npm run deploy    # serverless deploy (AWS)
npm run remove    # serverless remove (tears down the deployed stack)
```

## API

| Method | Path                     | Body                                              |
|--------|--------------------------|----------------------------------------------------|
| POST   | `/api/v1/auth/register`  | `{ name, username, email, password }`              |
| POST   | `/api/v1/auth/login`     | `{ username, password }`                           |

Validation rules (see `src/modules/users/user.schema.ts`):
- `username`: 3–24 chars, letters/numbers/`.`/`_` only
- `password`: min 8 chars, requires at least one lowercase, one uppercase, and one symbol
- `email` (register only): must be a valid email

Login returns `{ message, userId, accessToken }` in the body and sets a `refreshToken` cookie. The cookie is sent without `HttpOnly/Secure/SameSite/Max-Age` attributes when `IS_OFFLINE` is set (serverless-offline's cookie parser can't handle attributed `Set-Cookie` strings); the full attributed cookie is sent in real deployments.

## Deployment

```bash
npm run deploy
```

Deploys the `register` and `login` functions to AWS (region `ap-south-1`, see `serverless.yml`). Environment variables (`DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`) are pulled from `.env` via `serverless-dotenv-plugin` and set on the Lambda functions.
