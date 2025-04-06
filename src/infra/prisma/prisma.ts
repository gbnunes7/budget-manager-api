import { PrismaClient } from '@prisma/client';

const prismaInstance = new PrismaClient({ log: ['query'] });

export { prismaInstance };
