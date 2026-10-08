import { index, type NextFunction, type Request, type Response } from 'express';

export function validateBody(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors[0]?.message ?? 'بيانات غير صحيحة' });
    }

    req.body = result.data;
    next();
  };
}

export const healthCheck = (_req: Request, res: Response) => {
  res.status(200).json({ ok: true, message: 'backend ready' });
};
