import type { NextFunction, Request, Response } from 'express';
import { prismaInstance } from '../../prisma/prisma';
import { z } from 'zod';
import { CreateCategoryUseCases } from '../../../domain/budget-manager/application/use-cases/create-category-use-case';
import { CategoryRepository } from '../../prisma/repositories/prisma-category-repository';
import { CategoryPresenter } from '../presenter/category-presenter';

const createCategoryRepository = new CategoryRepository(prismaInstance);
const createCategoryUseCases = new CreateCategoryUseCases(
  createCategoryRepository,
);

export class CreateCategoryController {
  constructor(private createCategory: CreateCategoryUseCases) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    const schema = z.object({
      name: z.string(),
      type: z.enum(['INCOME', 'EXPENSE']),
    });

    try {
      const { name, type } = schema.parse(req.body);

      const execute = await this.createCategory.execute({
        name,
        type,
        createdAt: new Date(),
      });

      if (execute.isLeft()) {
        res.status(400).json({ message: execute.value.message });
        return;
      }

      const categoryToHttp = CategoryPresenter.toHTTP(execute.value.category);

      res.status(201).json({
        message: 'Category created',
        category: categoryToHttp,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid schema' });
        return;
      }

      next(error);
    }
  }
}

export const createCategoryController = new CreateCategoryController(
  createCategoryUseCases,
);
