import type { ICategoryRepository } from '../../src/domain/budget-manager/application/repositories/category-repository';
import type { Category } from '../../src/domain/budget-manager/enterprise/entities/category';

export class InMemoryCategoryRepository implements ICategoryRepository {
  public category: Category[] = [];

  async create(category: Category): Promise<void> {
    this.category.push(category);
  }
}
