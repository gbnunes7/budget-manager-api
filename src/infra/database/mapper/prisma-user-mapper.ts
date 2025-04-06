import { User } from '../../../domain/budget-manager/enterprise/entities/user';
import type { Prisma, User as PrismaUser } from '@prisma/client';

// biome-ignore lint/complexity/noStaticOnlyClass: 
export class PrismaUserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return new User(
      {
        name: prismaUser.name,
        email: prismaUser.email,
        passwordHash: prismaUser.password_hash,
      },
      prismaUser.id, 
    );
  }

  static toPrisma(user: User): Prisma.UserCreateInput {
    return {
      name: user.name,
      email: user.email,
      password_hash: user.passwordHash,
    };
  }
}
