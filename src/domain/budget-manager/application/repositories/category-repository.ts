import type { Category } from '../../enterprise/entities/category';

export interface ICategoryRepository {
  create(category: Category): Promise<void>;
}
