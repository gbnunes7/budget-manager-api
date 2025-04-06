import { z } from 'zod';
import 'dotenv/config'; 

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string(),
  PORT: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !Number.isNaN(val), {
      message: 'Expected number, received NaN',
    }),
    POSTGRESQL_USERNAME: z.string(),
    POSTGRESQL_PASSWORD: z.string(),
    POSTGRESQL_DATABASE: z.string(),
    SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Environment validation error:', _env.error.format());

  throw new Error('Environment validation error');
}

export const env = _env.data;
