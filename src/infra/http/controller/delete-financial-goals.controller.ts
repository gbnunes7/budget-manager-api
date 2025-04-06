import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { prismaInstance } from '../../prisma/prisma';

import { FinancialGoalsRepository } from '../../prisma/repositories/financial-goals-repository';
import { DeleteFinancialGoalsUseCases } from '../../../domain/budget-manager/application/use-cases/delete-financial-goals-use-case';
import { InvalidFinancialGoalsIdError } from '../../../domain/budget-manager/application/use-cases/errors/invalid-financial-goals-id-error';

const deleteFinancialGoalsRepository = new FinancialGoalsRepository(
  prismaInstance,
);
const deleteFinancialGoalsUseCases = new DeleteFinancialGoalsUseCases(
  deleteFinancialGoalsRepository,
);

export class DeleteFinancialGoalsController {
  constructor(private deleteFinancialGoals: DeleteFinancialGoalsUseCases) {
    this.handle = this.handle.bind(this);
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const schema = z.object({
      id: z.string(),
    });

    try {
      const { id } = schema.parse(request.params);

      const execute = await this.deleteFinancialGoals.execute({
        financialGoalsId: id,
      });

      if(execute.isLeft()) {
        throw execute.value;
      }

      response.status(200).send({ message: 'Financial goal deleted' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        response.status(400).json({ message: error.message });
        return;
      }

      if (error instanceof InvalidFinancialGoalsIdError) {
        response.status(404).json({ message: error.message });
        return;
      }

      next(error);
    }
  }
}

export const deleteFinancialGoalsController =
  new DeleteFinancialGoalsController(deleteFinancialGoalsUseCases);
