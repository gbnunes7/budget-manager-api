import 'dotenv/config';
import { afterAll, beforeAll } from 'vitest';
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

function generateUniqueDatabaseUrl (schemaId: string) {

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  if (process.env.NODE_ENV !== 'test') {
    throw new Error('NODE_ENV must be set to "test" for E2E tests');
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schemaId);

  return url.toString()
}

const schemaId = randomUUID();

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseUrl(schemaId);
  process.env.DATABASE_URL = databaseURL;

  execSync('pnpm prisma migrate deploy')
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
