# Denjo — Web Socket Chat App

A full-stack chat application called **Denjo**: a React/Vite client (auth + chat UI) backed by a serverless (AWS Lambda) TypeScript API with MongoDB via Prisma.

```
web-socket/
├── client/
│   ├── chat-app/        # React + Vite + TypeScript frontend
│   └── ws_client.js      # plain WebSocket client script
└── server/               # Serverless (AWS Lambda) backend
```

## Screenshots

<img width="1065" height="808" alt="image" src="https://github.com/user-attachments/assets/12aab4e7-e245-4a27-b168-9df24dd151b5" />


## Client (`client/chat-app`)

React 19 + TypeScript + Vite SPA.

**Stack:** Vite, React Router 7, Redux Toolkit + React Redux, React Hook Form + Zod (form validation), Ant Design (`antd`), Axios.

**Structure:**

```
client/chat-app/src/
├── api/axios.ts              # axios instance, attaches Bearer token from sessionStorage
├── pages/
│   ├── Login.tsx / Login.css
│   ├── Register.tsx / Register.css
│   └── Dashboard.tsx          # chat UI (contact header, thread, composer, AI suggestions panel)
├── components/
│   ├── layout/AppLayout.tsx   # authenticated app shell
│   └── ui/                    # Avatar, ChatThread, MessageBubble, MessageComposer,
│                               # AIPromptInput, AISuggestionsPanel, ContactHeader, Logo, Icons, ...
├── store/
│   ├── slices/store.ts        # Redux store
│   └── slices/{login,register}.slice.ts
├── protectedRoutes.tsx        # route guard for authenticated pages
└── App.tsx                    # routes: /register, /login, protected "/" -> Dashboard
```

The Dashboard renders a single-conversation chat thread (contact header, message bubbles, composer) with a toggleable AI suggestions panel.

**Run locally:**

```bash
cd client/chat-app
npm install
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build
npm run lint
```

The API base URL is currently hardcoded in [src/api/axios.ts](client/chat-app/src/api/axios.ts) to the deployed AWS API Gateway endpoint; point it at `http://localhost:3000` (or your `serverless offline` port) for local backend development.

## Server (`server/`)

Serverless (AWS Lambda) backend, written in TypeScript with Prisma + MongoDB. Auth endpoints (register/login) issue JWT access/refresh tokens.

**Stack:** AWS Lambda (Node.js 18.x) via the Serverless Framework + `serverless-offline` for local dev, MongoDB via Prisma, Zod for validation, `jsonwebtoken` + `bcryptjs` for auth.

**Data model** (`prisma/schema.prisma`): `User`, `Chat`, `ChatUser` (join table), `Message`.

**Structure:**

```
server/
├── handlers/                  # Lambda entry points (one file per function)
│   ├── register.ts
│   └── login.ts
├── prisma/schema.prisma       # User / Chat / ChatUser / Message models
├── prisma.config.ts           # Prisma config (loads DATABASE_URL from .env)
├── src/
│   ├── modules/users/         # controller / service / schema for auth
│   ├── utils/                 # hash.ts, response.ts, token.ts helpers
│   └── generated/prisma/      # generated Prisma client (gitignored)
└── serverless.yml             # Lambda functions, routes, env vars
```

**Setup:**

```bash
cd server
npm install
```

Create `server/.env` (gitignored):

```env
DATABASE_URL="mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority"
JWT_SECRET="your-access-token-secret"
JWT_REFRESH_SECRET="your-refresh-token-secret"
```

```bash
npx prisma generate   # generate client into src/generated/prisma
npx prisma db push    # sync schema.prisma to MongoDB (no SQL migrations on Mongo)
npx prisma studio     # browse/edit data
npm run dev            # serverless offline, http://localhost:3000 by default
npm run build          # tsc type-check / compile
npm run deploy         # serverless deploy (AWS, region ap-south-1)
npm run remove         # tear down the deployed stack
```

**API:**

| Method | Path                    | Body                                   |
|--------|-------------------------|------------------------------------------|
| POST   | `/api/v1/auth/register` | `{ name, username, email, password }`    |
| POST   | `/api/v1/auth/login`    | `{ username, password }`                 |

Validation (`src/modules/users/user.schema.ts`):
- `username`: 3–24 chars, letters/numbers/`.`/`_` only
- `password`: min 8 chars, requires lowercase, uppercase, and a symbol
- `email` (register only): must be a valid email

Login returns `{ message, userId, accessToken }` and sets a `refreshToken` cookie (unattributed under `serverless-offline`, fully attributed `HttpOnly/Secure/SameSite` in real deployments).

## Getting started end-to-end

```bash
# Terminal 1 — backend
cd server
npm install
npx prisma generate
npx prisma db push
npm run dev

# Terminal 2 — frontend
cd client/chat-app
npm install
npm run dev
```

Update [client/chat-app/src/api/axios.ts](client/chat-app/src/api/axios.ts) `baseURL` to point at your local `serverless offline` endpoint to run the full stack locally instead of the deployed API.
