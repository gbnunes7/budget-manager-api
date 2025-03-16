import { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import { left, right } from '../../../../core/types/either';
import type { Either } from '../../../../core/types/either';
import { Balance } from '../../enterprise/entities/balance';
import type { IBalanceRepository } from '../repositories/balance-repository';
import { AmountMustBeGreaterThanZeroError } from './errors/amount-must-be-greater-than-0-error';
import { InvalidUserIdError } from './errors/invalid-user-id-error';

interface UpdateBalanceRequest {
  userId: string;
  amount: number;
  operationType: 'EXPENSE' | 'INCOME';
  createdAt: Date;
}

interface UpdateBalanceResponse {
  balance: Balance;
}

class UpdateBalanceUseCase {
  constructor(private balanceRepository: IBalanceRepository) {}

  async execute({
    amount,
    createdAt,
    operationType,
    userId,
  }: UpdateBalanceRequest): Promise<
    Either<
      AmountMustBeGreaterThanZeroError | InvalidUserIdError,
      UpdateBalanceResponse
    >
  > {
    if (amount <= 0) {
      return left(new AmountMustBeGreaterThanZeroError());
    }

    if (!userId) {
      return left(new InvalidUserIdError());
    }

    const existingBalance = await this.balanceRepository.findByUserId(userId);

    let updatedBalance: Balance;

    if (existingBalance) {
      updatedBalance = existingBalance.updateAmount(
        amount,
        createdAt,
        operationType,
      );
    } else {
      updatedBalance = Balance.create({
        amount: operationType === 'INCOME' ? amount : -amount,
        createdAt,
        userId: new UniqueEntityId(userId),
      });
    }

    await this.balanceRepository.save(updatedBalance);

    return right({
      balance: updatedBalance,
    });
  }
}

export { UpdateBalanceUseCase };

//TODO: create a event to create a balance when a user is created
