import type { Category } from '../../../domain/budget-manager/enterprise/entities/category';

// biome-ignore lint/complexity/noStaticOnlyClass:
export class CategoryPresenter {
  static toHTTP(category: Category) {
    return {
      id: category.id.toString(),
      name: category.name,
      type: category.type,
      createdAt: category.createdAt,
    };
  }
}
