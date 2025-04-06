import type { PrismaClient } from '@prisma/client';

import type { IBalanceRepository } from '../../../domain/budget-manager/application/repositories/balance-repository';
import { PrismaBalanceMapper } from '../../database/mapper/prisma-balance-mapper';
import type { Balance } from '../../../domain/budget-manager/enterprise/entities/balance';

export class BalanceRepository implements IBalanceRepository {
  private balanceRepository: PrismaClient;

  constructor(balanceRepository: PrismaClient) {
    this.balanceRepository = balanceRepository;
  }
  async save(balance: Balance): Promise<void> {
    const prismaBalance = await this.balanceRepository.balance.update({
      where: {
        id: balance.id.toString(),
      },
      data: PrismaBalanceMapper.toPrisma(balance),
    });

    PrismaBalanceMapper.toDomain(prismaBalance);
  }

  async create(data: Balance): Promise<Balance> {
    const balance = await this.balanceRepository.balance.create({
      data: {
        id: data.id.toString(),
        user_id: data.userId.value,
        amount: data.amount,
        createdAt: data.createdAt,
      },
    });

    return PrismaBalanceMapper.toDomain(balance);
  }

  async findByUserId(id: string): Promise<Balance | null> {
    const balance = await this.balanceRepository.balance.findUnique({
      where: {
        id,
      },
    });

    if (!balance) {
      return null;
    }

    return PrismaBalanceMapper.toDomain(balance);
  }
}
