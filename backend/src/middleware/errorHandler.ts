import type { NextFunction, Request, Response } from 'express';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error('Error:', err);
  const message = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
  res.status(500).json({ message });
}
