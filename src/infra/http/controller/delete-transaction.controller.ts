import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { prismaInstance } from '../../prisma/prisma';

import { TransactionsRepository } from '../../prisma/repositories/prisma-transactions-repository';
import { DeleteTransactionUseCases } from '../../../domain/budget-manager/application/use-cases/delete-transaction-use-case';
import { TransactionNotFoundError } from '../../../domain/budget-manager/application/use-cases/errors/transaction-not-found-error';

const deleteTransactionRepository = new TransactionsRepository(prismaInstance);
const deleteTransactionUseCases = new DeleteTransactionUseCases(
  deleteTransactionRepository,
);

export class DeleteTransactionController {
  constructor(private deleteTransaction: DeleteTransactionUseCases) {
    this.handle = this.handle.bind(this);
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const schema = z.object({
      transactionId: z.string(),
    });

    try {
      const { transactionId } = schema.parse(request.params);

      const execute = await this.deleteTransaction.execute(transactionId);

      if (execute.isLeft()) {
        throw execute.value;
      }

      response.status(200).send({ message: 'Transaction deleted' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        response.status(400).json({ message: error.message });
        return;
      }

      if (error instanceof TransactionNotFoundError) {
        response.status(404).json({ message: error.message });
        return;
      }

      next(error);
    }
  }
}

export const deleteTransactionController = new DeleteTransactionController(
  deleteTransactionUseCases,
);
