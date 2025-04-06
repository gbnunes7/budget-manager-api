import type { NextFunction, Request, Response } from 'express';
import { prismaInstance } from '../../prisma/prisma';
import { z } from 'zod';

import { CategoryRepository } from '../../prisma/repositories/prisma-category-repository';
import { DeleteCategoryUseCases } from '../../../domain/budget-manager/application/use-cases/delete-category-use-case';

const deleteCategoryRepository = new CategoryRepository(prismaInstance);
const deleteCategoryUseCases = new DeleteCategoryUseCases(
  deleteCategoryRepository,
);

export class DeleteCategoryController {
  constructor(private deleteCategory: DeleteCategoryUseCases) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    const schema = z.object({
      id: z.string(),
    });

    try {
      const { id } = schema.parse(req.params);

      const execute = await this.deleteCategory.execute({ categoryId: id });

      if (execute.isLeft()) {
        res.status(400).json({ message: execute.value.message });
        return;
      }

      res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid id' });
        return;
      }

      next(error);
    }
  }
}

export const deleteCategoryController = new DeleteCategoryController(
  deleteCategoryUseCases,
);
