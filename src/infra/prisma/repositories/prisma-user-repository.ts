import type { PrismaClient } from '@prisma/client';
import type { IUserRepository } from '../../../domain/budget-manager/application/repositories/user-repository';
import type { User } from '../../../domain/budget-manager/enterprise/entities/user';
import { PrismaUserMapper } from '../../database/mapper/prisma-user-mapper';

export class UserRepository implements IUserRepository {
  private createUserRepository: PrismaClient;

  constructor(createUserRepository: PrismaClient) {
    this.createUserRepository = createUserRepository;
  }

  async create(user: User): Promise<User> {
    const prismaUser = await this.createUserRepository.user.create({
      data: PrismaUserMapper.toPrisma(user),
    });

    return PrismaUserMapper.toDomain(prismaUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.createUserRepository.user.findUnique({
      where: { email },
    });

    if (!prismaUser) return null;

    return PrismaUserMapper.toDomain(prismaUser);
  }

  async save(user: User): Promise<User> {
    const prismaUser = await this.createUserRepository.user.update({
      where: {
        id: user.id.toString(),
      },
      data: PrismaUserMapper.toPrisma(user),
    });

    return PrismaUserMapper.toDomain(prismaUser);
  }
}
