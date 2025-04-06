import type { PrismaClient } from '@prisma/client';
import type { ICategoryRepository } from '../../../domain/budget-manager/application/repositories/category-repository';
import type { Category } from '../../../domain/budget-manager/enterprise/entities/category';
import { PrismaCategoryMapper } from '../../database/mapper/prisma-category-mapper';

export class CategoryRepository implements ICategoryRepository {
  constructor(private categoryRepository: PrismaClient) {}

  async create(category: Category): Promise<Category> {
    const prismaCategory = await this.categoryRepository.category.create({
      data: {
        id: category.id.toString(),
        name: category.name,
        type: category.type,
        createdAt: category.createdAt,
      },
    });

    return PrismaCategoryMapper.toDomain(prismaCategory);
  }
  async delete(category: Category): Promise<void> {
    await this.categoryRepository.category.delete({
      where: {
        id: category.id.toString(),
      },
    });
  }
  async findById(id: string): Promise<Category | null> {
    const prismaCategory = await this.categoryRepository.category.findUnique({
      where: {
        id: id.toString(),
      },
    });

    return prismaCategory
      ? PrismaCategoryMapper.toDomain(prismaCategory)
      : null;
  }
}
