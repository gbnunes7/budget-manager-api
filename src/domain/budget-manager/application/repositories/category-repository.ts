import type { Category } from '../../enterprise/entities/category';

export interface ICategoryRepository {
  create(category: Category): Promise<void>;
  delete(category: Category): Promise<void>;
  findById(id: string): Promise<Category | null>;
}
