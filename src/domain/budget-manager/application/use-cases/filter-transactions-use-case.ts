import { type Either, right } from '../../../../core/types/either';
import type { Transaction } from '../../enterprise/entities/transaction';
import type { ITransactionRepository } from '../repositories/transaction-repository';

interface FilterTransactionsUseCaseRequest {
  [key: string]: string;
}

interface FilterTransactionsUseCaseResponse {
  transactions: Transaction[];
}

class FilterTransactionsUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(
    filter: FilterTransactionsUseCaseRequest,
  ): Promise<Either<Error, FilterTransactionsUseCaseResponse>> {
    const transactions = await this.transactionRepository.filter(filter);
    return right({ transactions });
  }
}

export { FilterTransactionsUseCase };
