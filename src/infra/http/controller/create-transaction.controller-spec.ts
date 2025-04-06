import type { NextFunction, Request, Response } from 'express';
import { CreateTransactionUseCases } from '../../../domain/budget-manager/application/use-cases/create-transaction-use-case';
import { z } from 'zod';
import { UniqueEntityId } from '../../../core/entitites/unique-entity-id';
import { TransactionsRepository } from '../../prisma/repositories/prisma-transactions-repository';
import { prismaInstance } from '../../prisma/prisma';
import { DescriptionMustBeProvidedError } from '../../../domain/budget-manager/application/use-cases/errors/description-must-be-provided-error';
import { DateCannotBeGreaterThanTodayError } from '../../../domain/budget-manager/application/use-cases/errors/date-cannot-be-greater-than-today-error';
import { InvalidBalanceIdError } from '../../../domain/budget-manager/application/use-cases/errors/invalid-balance-id-error';
import { InvalidTransactionTypeError } from '../../../domain/budget-manager/application/use-cases/errors/invalid-transaction-type-error';

const createTransactionRepository = new TransactionsRepository(prismaInstance);
const createTransactionUseCases = new CreateTransactionUseCases(
  createTransactionRepository,
);

export class CreateTransactionController {
  constructor(private createTransaction: CreateTransactionUseCases) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    const schema = z.object({
      amount: z.number(),
      balanceId: z.string(),
      categoryId: z.string(),
      date: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
      }, z.date()),
      description: z.string(),
      type: z.enum(['INCOME', 'EXPENSE']),
      userId: z.string(),
    });

    try {
      const { amount, balanceId, categoryId, date, description, type, userId } =
        schema.parse(req.body);

      const execute = await this.createTransaction.execute({
        amount,
        balanceId: new UniqueEntityId(balanceId),
        categoryId: new UniqueEntityId(categoryId),
        date,
        description,
        type,
        userId: new UniqueEntityId(userId),
      });

      if (execute.isLeft()) {
        res.status(400).json({ message: execute.value.message });
        return;
      }

      res.status(201).json({
        message: 'Transaction Created',
        transaction: execute.value.transaction,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid schema' });
        return;
      }

      if(error instanceof DescriptionMustBeProvidedError ) {
        res.status(400).json({ message: error.message });
        return;
      }

      if(error instanceof DateCannotBeGreaterThanTodayError ) {
        res.status(400).json({ message: error.message });
        return;
      }

      if(error instanceof InvalidBalanceIdError ) {
        res.status(400).json({ message: error.message });
        return;
      }

      if(error instanceof InvalidTransactionTypeError ) {
        res.status(400).json({ message: error.message });
        return;
      }

      next(error);
    }
  }
}

export const createTransactionController = new CreateTransactionController(
  createTransactionUseCases,
);
