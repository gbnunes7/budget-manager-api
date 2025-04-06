import type { NextFunction, Request, Response } from 'express';
import { prismaInstance } from '../../prisma/prisma';
import { z } from 'zod';
import { CategoryPresenter } from '../presenter/category-presenter';
import { BalanceRepository } from '../../prisma/repositories/prisma-balance-repository';
import { CreateBalanceUseCases } from '../../../domain/budget-manager/application/use-cases/create-balance-use-case';

const createBalanceRepository = new BalanceRepository(prismaInstance);
const createBalanceUseCases = new CreateBalanceUseCases(
  createBalanceRepository,
);

export class CreateBalanceController {
  constructor(private createBalance: CreateBalanceUseCases) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    const createBalanceSchema = z.object({
      user_id: z.string(),
      amount: z.number(),
    });

    try {
      const { user_id, amount } = createBalanceSchema.parse(req.body);

      const balance = await this.createBalance.execute({
        userId: user_id,
        amount,
        createdAt: new Date(),
      });

      res.status(201).json({
        message: 'Balance created successfully',
        balance: balance.value,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: 'Validation error',
          errors: error.errors,
        });
        return;
      }

      if (error instanceof Error) {
        res.status(400).json({
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        message: 'Internal server error',
      });
      return;
    }
  }
}

export const createBalanceController = new CreateBalanceController(
  createBalanceUseCases,
);
