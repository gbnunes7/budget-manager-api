import type { PrismaClient } from '@prisma/client';
import type { IFinancialGoalsRepository } from '../../../domain/budget-manager/application/repositories/financial-goals-repository';
import type { FinancialGoals } from '../../../domain/budget-manager/enterprise/entities/financial-goals';
import { PrismaFinancialGoalsMapper } from '../../database/mapper/prisma-financial-goals-mapper';

export class FinancialGoalsRepository implements IFinancialGoalsRepository {
  constructor(private financialGoalsRepository: PrismaClient) {}
  async create(financialGoals: FinancialGoals): Promise<FinancialGoals> {
    const financialGoalsRepo =
      await this.financialGoalsRepository.financialGoals.create({
        data: {
          id: financialGoals.id.toString(),
          goalValue: financialGoals.goalValue,
          goalDate: financialGoals.goalDate,
          description: financialGoals.description,
          createdAt: financialGoals.createdAt,
          user_id: financialGoals.userId,
        },
      });

    return PrismaFinancialGoalsMapper.toDomain(financialGoalsRepo);
  }

  async delete(financialGoalsId: string): Promise<void> {
    await this.financialGoalsRepository.financialGoals.delete({
      where: {
        id: financialGoalsId,
      },
    });
  }

  async findById(financialGoalsId: string): Promise<FinancialGoals | null> {
    const financialGoalsRepo =
      await this.financialGoalsRepository.financialGoals.findUnique({
        where: {
          id: financialGoalsId,
        },
      });

    if (!financialGoalsRepo) {
      return null;
    }

    return PrismaFinancialGoalsMapper.toDomain(financialGoalsRepo);
  }
}
