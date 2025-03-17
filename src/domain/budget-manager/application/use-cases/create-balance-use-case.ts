import { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import { left, right } from '../../../../core/types/either';
import type { Either } from '../../../../core/types/either';
import { Balance } from '../../enterprise/entities/balance';
import type { IBalanceRepository } from '../repositories/balance-repository';
import { AmountMustBeGreaterThanZeroError } from './errors/amount-must-be-greater-than-0-error';
import { InvalidUserIdError } from './errors/invalid-user-id-error';

interface CreateBalanceUseCasesRequest {
  userId: string;
  amount: number;
  createdAt: Date;
}

interface CreateBalanceUseCasesResponse {
  balance: Balance;
}

class CreateBalanceUseCases {
  constructor(private balanceRepository: IBalanceRepository) {}

  async execute({
    amount,
    createdAt,
    userId,
  }: CreateBalanceUseCasesRequest): Promise<
    Either<
      AmountMustBeGreaterThanZeroError | InvalidUserIdError,
      CreateBalanceUseCasesResponse
    >
  > {
    const balance = Balance.create({
      amount,
      createdAt: new Date(),
      userId: new UniqueEntityId(userId),
    });

    if (amount < 0) {
      return left(new AmountMustBeGreaterThanZeroError());
    }

    if (!userId) {
      return left(new InvalidUserIdError());
    }

    await this.balanceRepository.create(balance);

    return right({
      balance,
    });
  }
}

export { CreateBalanceUseCases };
