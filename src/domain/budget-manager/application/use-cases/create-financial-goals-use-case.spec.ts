import { expect, it, describe, beforeEach } from 'vitest';
import { InMemoryFinancialGoalsRepository } from '../../../../../test/repositories/in-memory-financial-goals-repository';
import { CreateFinancialGoalsUseCases } from './create-financial-goals-use-case';

let financialGoalsRepository: InMemoryFinancialGoalsRepository;
let sut: CreateFinancialGoalsUseCases;

describe('CreateFinancialGoalsUseCase', () => {
  beforeEach(() => {
    financialGoalsRepository = new InMemoryFinancialGoalsRepository();
    sut = new CreateFinancialGoalsUseCases(financialGoalsRepository);
  });

  it('should be able to create a financial goal', async () => {
    const response = await sut.execute({
      description: 'Comprar um carro',
      goalDate: new Date('2026-12-31'),
      goalValue: 50000,
      createdAt: new Date(),
      userId: '1',
    });

    expect(response.isRight()).toBe(true);
    expect(financialGoalsRepository.financialGoals.length).toBe(1);
  });

  it("shouldn't be able to create a financial goal with a negative value", async () => {
    const response = await sut.execute({
      description: 'Comprar um carro',
      goalDate: new Date('2026-12-31'),
      goalValue: -50000,
      createdAt: new Date(),
      userId: '1',
    });

    expect(response.isLeft()).toBe(true);
    expect(financialGoalsRepository.financialGoals.length).toBe(0);
  });

  it("shouldn't be able to create a financial goal with a past date", async () => {
    const response = await sut.execute({
      description: 'Comprar um carro',
      goalDate: new Date('2021-12-31'),
      goalValue: 50000,
      createdAt: new Date(),
      userId: '1',
    });

    expect(response.isLeft()).toBe(true);
    expect(financialGoalsRepository.financialGoals.length).toBe(0);
  });

  it("shouldn't be able to create a financial goal without a description", async () => {
    const response = await sut.execute({
      description: '',
      goalDate: new Date('2026-12-31'),
      goalValue: 50000,
      createdAt: new Date(),
      userId: '1',
    });

    expect(response.isLeft()).toBe(true);
    expect(financialGoalsRepository.financialGoals.length).toBe(0);
  });
});
