import type { ICategoryRepository } from '../../src/domain/budget-manager/application/repositories/category-repository';
import type { Category } from '../../src/domain/budget-manager/enterprise/entities/category';

export class InMemoryCategoryRepository implements ICategoryRepository {
  public category: Category[] = [];

  async create(category: Category): Promise<Category> {
    this.category.push(category);
    return category;
  }

  async delete(category: Category): Promise<void> {
    this.category = this.category.filter(
      (c) => !c.id.equals(category.id),
    );
  }

  async findById(id: string): Promise<Category | null> {
    return this.category.find((c) => c.id.toString() === id) || null;
  }

}
