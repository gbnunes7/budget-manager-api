import { expect, it, describe, beforeEach } from 'vitest';

import { DeleteFinancialGoalsUseCases } from './delete-financial-goals-use-case';
import { InMemoryFinancialGoalsRepository } from '../../../../../test/repositories/in-memory-financial-goals-repository';
import { FinancialGoals } from '../../enterprise/entities/financial-goals';

let financialRepository: InMemoryFinancialGoalsRepository;
let sut: DeleteFinancialGoalsUseCases;

describe('DeleteFinancialGoalsUseCases', () => {
  beforeEach(() => {
    financialRepository = new InMemoryFinancialGoalsRepository();
    sut = new DeleteFinancialGoalsUseCases(financialRepository);
  });

  it('should be able to delete a financial goal', async () => {
    const financialGoal = FinancialGoals.create({
      createdAt: new Date(),
      goalValue: 1000,
      description: 'Test financial goal',
      goalDate: new Date(),
      userId: 'test-user-id',
    });

    await financialRepository.create(financialGoal);

    const response = await sut.execute({
        financialGoalsId: financialGoal.id.toString(),
    });

    expect(response.isRight()).toBe(true);
  });

  it('should not be able to delete a category with invalid id', async () => {
    const response = await sut.execute({
        financialGoalsId: 'invalid-id',
    });

    expect(response.isLeft()).toBe(true);
  });
});
