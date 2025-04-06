import type {
  Prisma,
  FinancialGoals as PrismaFinancialGoals,
} from '@prisma/client';
import { FinancialGoals } from '../../../domain/budget-manager/enterprise/entities/financial-goals';

// biome-ignore lint/complexity/noStaticOnlyClass:
export class PrismaFinancialGoalsMapper {
  static toDomain(prismaFinancialGoals: PrismaFinancialGoals): FinancialGoals {
    return FinancialGoals.create(
      {
        goalValue: prismaFinancialGoals.goalValue,
        goalDate: prismaFinancialGoals.goalDate,
        description: prismaFinancialGoals.description,
        createdAt: prismaFinancialGoals.createdAt,
        userId: prismaFinancialGoals.user_id,
      },
      prismaFinancialGoals.id,
    );
  }

  static toPrisma(
    financialgoals: FinancialGoals,
  ): Prisma.FinancialGoalsCreateInput {
    return {
      description: financialgoals.description,
      goalDate: financialgoals.goalDate,
      goalValue: financialgoals.goalValue,
      createdAt: financialgoals.createdAt,
      user: {
        connect: {
          id: financialgoals.userId,
        },
      },
    };
  }
}
