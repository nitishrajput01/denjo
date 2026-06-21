import { Response } from 'express';

type Headers = Record<string, string>;

export function successResponse(
  res: Response,
  data: unknown,
  message = 'Success',
  statusCode = 200,
  headers?: Headers
) {
  if (headers) res.set(headers);
  return res.status(statusCode).json({ success: true, message, data });
}

export function createdResponse(res: Response, data: unknown, message = 'Created', headers?: Headers) {
  return successResponse(res, data, message, 201, headers);
}

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

export function unauthorizedResponse(res: Response, message = 'Unauthorized', headers?: Headers) {
  return errorResponse(res, message, 401, undefined, headers);
}

export function forbiddenResponse(res: Response, message = 'Forbidden', headers?: Headers) {
  return errorResponse(res, message, 403, undefined, headers);
}

export function validationErrorResponse(res: Response, errors: unknown, headers?: Headers) {
  return errorResponse(res, 'Validation failed', 422, errors, headers);
}
