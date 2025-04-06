import { DomainEvents } from '../../../../core/events/domain-events';
import { type Either, left, right } from '../../../../core/types/either';
import { Transaction } from '../../enterprise/entities/transaction';
import type { ITransactionRepository } from '../repositories/transaction-repository';
import { TransactionNotFoundError } from './errors/transaction-not-found-error';

class DeleteTransactionUseCases {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(
    transactionId: string,
  ): Promise<Either<TransactionNotFoundError, void>> {
    const transaction =
      await this.transactionRepository.findById(transactionId);

    if (!transaction) {
      return left(new TransactionNotFoundError());
    }

    transaction.delete();

    await this.transactionRepository.delete(transaction);

    DomainEvents.dispatchEventsForAggregate(transaction.id);

    return right(undefined);
  }
}

export { DeleteTransactionUseCases };
