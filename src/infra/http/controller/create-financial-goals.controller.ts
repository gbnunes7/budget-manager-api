import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { prismaInstance } from '../../prisma/prisma';
import { CreateFinancialGoalsUseCases } from '../../../domain/budget-manager/application/use-cases/create-financial-goals-use-case';
import { FinancialGoalsRepository } from '../../prisma/repositories/financial-goals-repository';
import { FinancialGoalsPresenter } from '../presenter/financial-goals-presenter';

const createFinancialGoalsRepository = new FinancialGoalsRepository(
  prismaInstance,
);
const createFinancialGoalsUseCases = new CreateFinancialGoalsUseCases(
  createFinancialGoalsRepository,
);

export class CreateFinancialGoalsController {
  constructor(private createFinancialGoals: CreateFinancialGoalsUseCases) {
    this.handle = this.handle.bind(this);
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const schema = z.object({
      description: z.string(),
      goalDate: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) {
          const date = new Date(arg);
          if (!Number.isNaN(date.getTime())) return date;
        }
        return arg;
      }, z.date()),
      goalValue: z.number(),
      userId: z.string(),
    });

    try {
      const { description, goalDate, goalValue, userId } = schema.parse(
        request.body,
      );

      const execute = await this.createFinancialGoals.execute({
        description,
        goalDate,
        goalValue,
        userId,
        createdAt: new Date(),
      });

      if (execute.isLeft()) {
        response.status(400).json({ message: execute.value.message });
        return;
      }

      const financialGoals = FinancialGoalsPresenter.toHTTP(
        execute.value.financialGoals,
      );

      response.status(201).send({ financialGoals });
    } catch (error) {
      if (error instanceof z.ZodError) {
        response.status(400).json({ message: error.message });
        return;
      }

      next(error);
    }
  }
}

export const createFinancialGoalsController =
  new CreateFinancialGoalsController(createFinancialGoalsUseCases);
