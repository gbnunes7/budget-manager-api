import { left, right } from '../../../../core/types/either';
import type { Either } from '../../../../core/types/either';

import { FinancialGoals } from '../../enterprise/entities/financial-goals';
import type { IFinancialGoalsRepository } from '../repositories/financial-goals-repository';
import { DescriptionMustBeProvidedError } from './errors/description-must-be-provided-error';
import { GoalDateMustBeGreaterThanTodayError } from './errors/goal-date-mut-be-greater-than-today-error';
import { GoalValueMustBeGreaterThanZeroError } from './errors/goal-value-must-be-greater-than-zero-error';

interface CreateFinancialGoalsUseCasesRequest {
  goalValue: number;
  goalDate: Date;
  description: string;
  createdAt: Date;
  userId: string;
}

interface CreateFinancialGoalsUseCasesResponse {
  financialGoals: FinancialGoals;
}

class CreateFinancialGoalsUseCases {
  constructor(private financialGoalsRepository: IFinancialGoalsRepository) {}

  async execute({
    createdAt,
    description,
    goalDate,
    goalValue,
    userId,
  }: CreateFinancialGoalsUseCasesRequest): Promise<
    Either<
      | GoalValueMustBeGreaterThanZeroError
      | GoalDateMustBeGreaterThanTodayError
      | DescriptionMustBeProvidedError,
      CreateFinancialGoalsUseCasesResponse
    >
  > {
    const financialGoals = FinancialGoals.create({
      createdAt: new Date(),
      description,
      goalDate,
      goalValue,
      userId,
    });

    if (goalValue <= 0) {
      return left(new GoalValueMustBeGreaterThanZeroError());
    }

    if (goalDate < new Date()) {
      return left(new GoalDateMustBeGreaterThanTodayError());
    }

    if (!description) {
      return left(new DescriptionMustBeProvidedError());
    }

    await this.financialGoalsRepository.create(financialGoals);

    return right({
      financialGoals,
    });
  }
}

export { CreateFinancialGoalsUseCases };
