import { left, right } from '../../../../core/types/either';
import type { Either } from '../../../../core/types/either';
import { Category } from '../../enterprise/entities/category';
import type { ICategoryRepository } from '../repositories/category-repository';
import { CategoryNotFoundError } from './errors/category-not-found-error';
import { InvalidCategoryTypeError } from './errors/invalid-category-type-error';

interface DeleteCategoryUseCasesRequest {
  categoryId: string;
}

class DeleteCategoryUseCases {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute({
    categoryId
  }: DeleteCategoryUseCasesRequest): Promise<Either<CategoryNotFoundError , void>> {
    const category = await this.categoryRepository.findById(categoryId);

    if(!category) {
      return left(new CategoryNotFoundError());
    }

    await this.categoryRepository.delete(category);

    return right(undefined);
  }
}

export { DeleteCategoryUseCases };
