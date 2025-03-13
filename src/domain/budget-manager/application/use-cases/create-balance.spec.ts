import { expect, it, describe, beforeEach } from 'vitest';
import { CreateBalanceUseCases } from './create-balance';
import { InMemoryBalanceRepository } from '../../../../../test/repositories/in-memory-balance-repository';

let balanceRepository: InMemoryBalanceRepository;
let sut: CreateBalanceUseCases;

describe('CreateBalanceUseCases', () => {
  beforeEach(() => {
    balanceRepository = new InMemoryBalanceRepository();
    sut = new CreateBalanceUseCases(balanceRepository);
  });

  it('should be able to create a balance', async () => {
    const response = await sut.execute({
      amount: 100,
      createdAt: new Date(),
      userId: '1',
    });

    expect(response.isRight()).toBe(true);
    expect(balanceRepository.balances.length).toBe(1);
  });

  it('should not be able to create a balance with amount less than or equal to 0', async () => {
    const response = await sut.execute({
      amount: 0,
      createdAt: new Date(),
      userId: '1',
    });

    expect(response.isLeft()).toBe(true);
    expect(balanceRepository.balances.length).toBe(0);
  });

  it('should not be able to create a balance with invalid user id', async () => {
    const response = await sut.execute({
      amount: 100,
      createdAt: new Date(),
      userId: '',
    });

    expect(response.isLeft()).toBe(true);
    expect(balanceRepository.balances.length).toBe(0);
  });
});
