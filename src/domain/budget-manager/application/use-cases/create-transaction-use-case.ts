import type { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import { left, right } from '../../../../core/types/either';
import type { Either } from '../../../../core/types/either';
import { Transaction } from '../../enterprise/entities/transaction';
import type { ITransactionRepository } from '../repositories/transaction-repository';
import { AmountMustBeGreaterThanZeroError } from './errors/amount-must-be-greater-than-0-error';
import { DateCannotBeGreaterThanTodayError } from './errors/date-cannot-be-greater-than-today-error';
import { DescriptionMustBeProvidedError } from './errors/description-must-be-provided-error';
import { InvalidBalanceIdError } from './errors/invalid-balance-id-error';
import { InvalidCategoryIdError } from './errors/invalid-category-id-error';
import { InvalidTransactionTypeError } from './errors/invalid-transaction-type-error';

export interface CreateTransactionUseCaseRequest {
  categoryId: UniqueEntityId;
  amount: number;
  description: string;
  date: Date;
  balanceId: UniqueEntityId;
  type: 'EXPENSE' | 'INCOME';
  userId: UniqueEntityId;
}

interface CreateTransactionUseCaseResponse {
  transaction: Transaction;
}

class CreateTransactionUseCases {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute({
    amount,
    balanceId,
    categoryId,
    date,
    description,
    type,
    userId,
  }: CreateTransactionUseCaseRequest): Promise<
    Either<
      | AmountMustBeGreaterThanZeroError
      | InvalidCategoryIdError
      | InvalidBalanceIdError
      | InvalidTransactionTypeError
      | DateCannotBeGreaterThanTodayError,
      CreateTransactionUseCaseResponse
    >
  > {
    if (amount <= 0) {
      return left(new AmountMustBeGreaterThanZeroError());
    }

    if (type !== 'EXPENSE' && type !== 'INCOME') {
      return left(new InvalidTransactionTypeError());
    }

    if (!categoryId.value) {
      return left(new InvalidCategoryIdError());
    }

    if (date > new Date()) {
      return left(new DateCannotBeGreaterThanTodayError());
    }

    if (!balanceId.value) {
      return left(new InvalidBalanceIdError());
    }

    if (description === '') {
      return left(new DescriptionMustBeProvidedError());
    }

    const transaction = Transaction.create({
      amount,
      balanceId,
      categoryId,
      date: new Date(),
      description,
      type,
      userId,
    });

    await this.transactionRepository.create(transaction);

    return right({
      transaction,
    });
  }
}

export { CreateTransactionUseCases };
