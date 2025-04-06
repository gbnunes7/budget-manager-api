import { left, right } from '../../../../core/types/either';
import type { Either } from '../../../../core/types/either';

import { FinancialGoals } from '../../enterprise/entities/financial-goals';
import type { IFinancialGoalsRepository } from '../repositories/financial-goals-repository';
import { DescriptionMustBeProvidedError } from './errors/description-must-be-provided-error';
import { GoalDateMustBeGreaterThanTodayError } from './errors/goal-date-mut-be-greater-than-today-error';
import { GoalValueMustBeGreaterThanZeroError } from './errors/goal-value-must-be-greater-than-zero-error';
import { InvalidFinancialGoalsIdError } from './errors/invalid-financial-goals-id-error';

interface DeleteFinancialGoalsUseCasesRequest {
  financialGoalsId: string;
}

class DeleteFinancialGoalsUseCases {
  constructor(private financialGoalsRepository: IFinancialGoalsRepository) {}

  async execute({
    financialGoalsId,
  }: DeleteFinancialGoalsUseCasesRequest): Promise<
    Either<InvalidFinancialGoalsIdError, void>
  > {

    const financialGoals = await this.financialGoalsRepository.findById(financialGoalsId);

    if (!financialGoals) {
      return left(new InvalidFinancialGoalsIdError());
    }

    await this.financialGoalsRepository.delete(financialGoalsId);

    return right(undefined);
  }
}

export { DeleteFinancialGoalsUseCases };
