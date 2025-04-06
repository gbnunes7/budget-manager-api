import type { Prisma, Balance as PrismaBalance } from '@prisma/client';
import { Balance } from '../../../domain/budget-manager/enterprise/entities/balance';
import { UniqueEntityId } from '../../../core/entitites/unique-entity-id';

// biome-ignore lint/complexity/noStaticOnlyClass:
export class PrismaBalanceMapper {
  static toDomain(prismaBalance: PrismaBalance): Balance {
    return Balance.create(
      {
        userId: new UniqueEntityId(prismaBalance.user_id),
        amount: prismaBalance.amount,
        createdAt: prismaBalance.createdAt,
      },
      prismaBalance.id,
    );
  }

  static toPrisma(balance: Balance): Prisma.BalanceCreateInput {
    return {
      amount: balance.amount,
      createdAt: balance.createdAt,
      user: {
        connect: {
          id: balance.userId.value,
        },
      },
    };
  }
}
