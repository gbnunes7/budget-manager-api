import type { PrismaClient } from '@prisma/client';
import type { ITransactionRepository } from '../../../domain/budget-manager/application/repositories/transaction-repository';
import type { Transaction } from '../../../domain/budget-manager/enterprise/entities/transaction';
import { PrismaTransactionMapper } from '../../database/mapper/prisma-transaction-mapper';

export class TransactionsRepository implements ITransactionRepository {
  constructor(private transactionsRepository: PrismaClient) {}

  async create(transaction: Transaction): Promise<Transaction> {
    const transactionCreated =
      await this.transactionsRepository.transactions.create({
        data: {
          id: transaction.id.toString(),
          amount: transaction.amount,
          description: transaction.description,
          date: transaction.date,
          type: transaction.type,
          balanceId: transaction.balanceId.toString(),
          categoryId: transaction.categoryId.toString(),
          userId: transaction.userId.toString(),
        },
      });

    return PrismaTransactionMapper.toDomain(transactionCreated);
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction =
      await this.transactionsRepository.transactions.findUnique({
        where: { id },
      });

    if (!transaction) return null;

    return PrismaTransactionMapper.toDomain(transaction);
  }

  async delete(transaction: Transaction): Promise<void> {
    await this.transactionsRepository.transactions.delete({
      where: { id: transaction.id.toString() },
    });
  }

  async save(transaction: Transaction): Promise<void> {
    await this.transactionsRepository.transactions.update({
      where: { id: transaction.id.toString() },
      data: PrismaTransactionMapper.toPrisma(transaction),
    });
  }

  async filter(filter: Record<string, string>): Promise<Transaction[]> {
    const transactions =
      await this.transactionsRepository.transactions.findMany({
        where: {
          userId: filter.userId,
          date: {
            gte: new Date(filter.startDate),
            lte: new Date(filter.endDate),
          },
        },
      });
    return transactions.map(PrismaTransactionMapper.toDomain);
  }

  async getAll(): Promise<Transaction[]> {
    const transactions =
      await this.transactionsRepository.transactions.findMany();

    return transactions.map(PrismaTransactionMapper.toDomain);
  }

  async getTransactionsByUserIdAndDataRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Transaction[]> {
    const transactions =
      await this.transactionsRepository.transactions.findMany({
        where: {
          userId,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

    return transactions.map(PrismaTransactionMapper.toDomain);
  }
}
