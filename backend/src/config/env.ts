import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.string().default('development'),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(8).default('lunaro-secret-override'),
  RESEND_API_KEY: z.string().optional(),
  MAIL_FROM: z.string().default('Lunaro Core <noreply@lunaro.local>'),
  CONTACT_TO_EMAIL: z.string().default('ahmedmohamedstoer1234@gmail.com'),
  PUBLIC_SITE_URL: z.string().default('http://localhost:5173'),
});

export const env = envSchema.parse(process.env);
