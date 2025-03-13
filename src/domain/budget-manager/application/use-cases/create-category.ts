import { left, right } from '../../../../core/types/either';
import type { Either } from '../../../../core/types/either';
import { Category } from '../../enterprise/entities/category';
import type { ICategoryRepository } from '../repositories/category-repository';
import { InvalidCategoryTypeError } from './errors/invalid-category-type-error';

interface CreateCategoryUseCasesRequest {
  name: string;
  type: 'INCOME' | 'EXPENSE';
  createdAt: Date;
}

interface CreateCategoryUseCasesResponse {
  category: Category;
}

class CreateCategoryUseCases {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute({
    createdAt,
    name,
    type,
  }: CreateCategoryUseCasesRequest): Promise<
    Either<Error, CreateCategoryUseCasesResponse>
  > {
    const category = Category.create({
      name,
      createdAt: new Date(),
      type,
    });

    if(type !== 'INCOME' && type !== 'EXPENSE') {
      return left(new InvalidCategoryTypeError());
    }

    await this.categoryRepository.create(category);

    return right({
      category,
    });
  }
}

export { CreateCategoryUseCases };
