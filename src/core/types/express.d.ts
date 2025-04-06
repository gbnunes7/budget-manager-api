// src/@types/express.d.ts
import type { User } from '@prisma/client';

declare module 'express' {
  interface Request {
    user?: Partial<User>;
  }
}
