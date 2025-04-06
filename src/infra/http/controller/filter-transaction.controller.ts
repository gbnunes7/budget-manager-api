import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { prismaInstance } from '../../prisma/prisma';

import { TransactionsRepository } from '../../prisma/repositories/prisma-transactions-repository';

import { TransactionNotFoundError } from '../../../domain/budget-manager/application/use-cases/errors/transaction-not-found-error';
import { FilterTransactionsUseCase } from '../../../domain/budget-manager/application/use-cases/filter-transactions-use-case';

const filterTransactionRepository = new TransactionsRepository(prismaInstance);
const filterTransactionUseCases = new FilterTransactionsUseCase(
  filterTransactionRepository,
);

export class FilterTransactionController {
  constructor(private filterTransaction: FilterTransactionsUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const schema = z.object({
      userId: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    });

    try {
      const { userId, startDate, endDate } = schema.parse(request.body);

      const filter = {
        userId,
        startDate,
        endDate,
      };

      const result = await this.filterTransaction.execute(filter);

      if (result.isLeft()) {
        response.status(400).json({
          error: result.value.message,
        });
        return;
      }

      response.status(200).json(result.value.transactions);
    } catch (error) {
      if (error instanceof z.ZodError) {
        response.status(400).json({
          error: 'Invalid request data',
          issues: error.issues,
        });
        return;
      }

      if (error instanceof TransactionNotFoundError) {
        response.status(404).json({
          error: error.message,
        });
        return;
      }

      next(error);
    }
  }
}

export const filterTransactionController = new FilterTransactionController(
  filterTransactionUseCases,
);
