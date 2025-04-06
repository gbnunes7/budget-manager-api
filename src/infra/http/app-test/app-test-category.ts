import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { CategoryRepository } from '../../prisma/repositories/prisma-category-repository';
import { CreateCategoryUseCases } from '../../../domain/budget-manager/application/use-cases/create-category-use-case';
import { CreateCategoryController } from '../controller/create-category.controller';
import { DeleteCategoryController } from '../controller/delete-category.controller';
import { DeleteCategoryUseCases } from '../../../domain/budget-manager/application/use-cases/delete-category-use-case';

export async function createAppCategory() {
  const prisma = new PrismaClient();
  const app = express();

  app.use(express.json());
  app.use(cors());

  const userRepo = new CategoryRepository(prisma);
  const useCase = new CreateCategoryUseCases(userRepo);
  const controller = new CreateCategoryController(useCase);
  const deleteUseCase = new DeleteCategoryUseCases(userRepo);
  const deleteController = new DeleteCategoryController(deleteUseCase);

  app.post('/category', controller.handle);
  app.delete('/category/:id', deleteController.handle);

  return app;
}
