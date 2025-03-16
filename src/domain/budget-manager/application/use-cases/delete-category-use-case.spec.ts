import { expect, it, describe, beforeEach } from 'vitest';
import { InMemoryCategoryRepository } from '../../../../../test/repositories/in-memory-category-repository';
import { DeleteCategoryUseCases } from './delete-category-use-case';
import { Category } from '../../enterprise/entities/category';

let categoryRepository: InMemoryCategoryRepository;
let sut: DeleteCategoryUseCases;

describe('DeleteCategoryUseCases', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    sut = new DeleteCategoryUseCases(categoryRepository);
  });

  it('should be able to delete a category', async () => {
    const category = Category.create({
      createdAt: new Date(),
      name: 'Alimentação',
      type: 'EXPENSE',
    });

    await categoryRepository.create(category);

    const response = await sut.execute({
      categoryId: category.id.toString(),
    });

    expect(response.isRight()).toBe(true);
  });

  it('should not be able to delete a category with invalid id', async () => {
    const response = await sut.execute({
      categoryId: 'category.id.toString(),',
    });

    expect(response.isLeft()).toBe(true);
  });
});
