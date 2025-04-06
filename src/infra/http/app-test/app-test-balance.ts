import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { BalanceRepository } from '../../prisma/repositories/prisma-balance-repository';
import { CreateBalanceUseCases } from '../../../domain/budget-manager/application/use-cases/create-balance-use-case';
import { CreateBalanceController } from '../controller/create-balance.controller';

export async function createAppBalance() {
  const prisma = new PrismaClient();
  const app = express();

  app.use(express.json());
  app.use(cors());

  const createBalanceRepository = new BalanceRepository(prisma);
  const createBalanceUseCases = new CreateBalanceUseCases(
    createBalanceRepository,
  );
  const createBalanceController = new CreateBalanceController(
    createBalanceUseCases,
  );

  await prisma.user.create({
    data: {
      id: '1',
      name: 'John Doe',
      email: 'bielrj170@gmail.com',
      password_hash: '123456',
    },
  });

  app.post('/balance', createBalanceController.handle);

  return app;
}
