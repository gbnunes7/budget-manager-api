import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { FinancialGoalsRepository } from '../../prisma/repositories/financial-goals-repository';
import { CreateFinancialGoalsUseCases } from '../../../domain/budget-manager/application/use-cases/create-financial-goals-use-case';
import { CreateFinancialGoalsController } from '../controller/create-financial-goals.controller';
import { DeleteFinancialGoalsUseCases } from '../../../domain/budget-manager/application/use-cases/delete-financial-goals-use-case';
import { DeleteFinancialGoalsController } from '../controller/delete-financial-goals.controller';

export async function createAppFinancialGoals() {
  const prisma = new PrismaClient();
  const app = express();

  app.use(express.json());
  app.use(cors());

  const userRepo = new FinancialGoalsRepository(prisma);
  const useCase = new CreateFinancialGoalsUseCases(userRepo);
  const deleteUseCase = new DeleteFinancialGoalsUseCases(userRepo);
  const controller = new CreateFinancialGoalsController(useCase);
  const deleteController = new DeleteFinancialGoalsController(deleteUseCase);

  await prisma.user.create({
    data: {
      id: '1',
      name: 'John Doe',
      email: 'bielrj170@gmail.com',
      password_hash: '123456',
    },
  });

  app.post('/financial-goals/user', controller.handle);
  app.delete('/financial-goals/:id', deleteController.handle);

  return app;
}
