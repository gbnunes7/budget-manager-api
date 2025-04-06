import type { Prisma, Category as PrismaCategory } from '@prisma/client';
import { Category } from '../../../domain/budget-manager/enterprise/entities/category';

// biome-ignore lint/complexity/noStaticOnlyClass:
export class PrismaCategoryMapper {
  static toDomain(prismaCategory: PrismaCategory): Category {
    return Category.create(
      {
        name: prismaCategory.name,
        type: prismaCategory.type,
        createdAt: prismaCategory.createdAt,
      },
      prismaCategory.id,
    );
  }

  static toPrisma(category: Category): Prisma.CategoryCreateInput {
    return {
      name: category.name,
      type: category.type,
      createdAt: category.createdAt,
    };
  }
}
