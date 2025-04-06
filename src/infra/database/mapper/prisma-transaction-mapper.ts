import type { Prisma, Transactions as PrismaTransaction } from '@prisma/client';
import { Transaction } from '../../../domain/budget-manager/enterprise/entities/transaction';
import { UniqueEntityId } from '../../../core/entitites/unique-entity-id';

// biome-ignore lint/complexity/noStaticOnlyClass:
export class PrismaTransactionMapper {
  static toDomain(prismaTransactionMapper: PrismaTransaction): Transaction {
    return Transaction.create(
      {
        amount: prismaTransactionMapper.amount,
        balanceId: new UniqueEntityId(prismaTransactionMapper.balanceId),
        categoryId: new UniqueEntityId(prismaTransactionMapper.categoryId),
        date: prismaTransactionMapper.date,
        description: prismaTransactionMapper.description,
        type: prismaTransactionMapper.type,
        userId: new UniqueEntityId(prismaTransactionMapper.userId),
      },
      prismaTransactionMapper.id,
    );
  }

  static toPrisma(transaction: Transaction): Prisma.TransactionsCreateInput {
    return {
      id: transaction.id.toString(),
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date,
      type: transaction.type,
      balance: { connect: { id: transaction.balanceId.toString() } },
      category: { connect: { id: transaction.categoryId.toString() } },
      user: { connect: { id: transaction.userId.toString() } },
    };
  }
}
