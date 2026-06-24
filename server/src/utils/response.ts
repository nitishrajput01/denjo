import { Response } from 'express';

type Headers = Record<string, string>;

export function errorResponse(
  res: Response,
  message = 'Internal server error',
  statusCode = 500,
  errors?: unknown,
  headers?: Headers
) {
  if (headers) res.set(headers);
  return res.status(statusCode).json({ success: false, message, errors });
}

export function notFoundResponse(res: Response, message = 'Not found', headers?: Headers) {
  return errorResponse(res, message, 404, undefined, headers);
}
