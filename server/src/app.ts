import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./routes";
import { errorResponse, notFoundResponse } from "./utils/response";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? "*",
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use('/api/v1', router)

// 404 handler
app.use((_req: Request, res: Response) => {
  notFoundResponse(res);
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  errorResponse(res);
});

export default app;
