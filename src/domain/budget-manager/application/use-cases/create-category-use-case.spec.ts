import { expect, it, describe, beforeEach } from 'vitest';
import { InMemoryCategoryRepository } from '../../../../../test/repositories/in-memory-category-repository';
import { CreateCategoryUseCases } from './create-category-use-case';

let categoryRepository: InMemoryCategoryRepository;
let sut: CreateCategoryUseCases;

describe('CreateCategoryUseCases', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    sut = new CreateCategoryUseCases(categoryRepository);
  });

  it('should be able to create a balance', async () => {
    const response = await sut.execute({
      createdAt: new Date(),
      name: 'Alimentação',
      type: 'EXPENSE',
    });

    expect(response.isRight()).toBe(true);
    expect(categoryRepository.category.length).toBe(1);
  });

  it('should not be able to create a category with invalid type', async () => {
    const response = await sut.execute({
      createdAt: new Date(),
      name: 'Alimentação',
      // biome-ignore lint: this is a test to check if the error is being thrown
      type: 'INVALID_TYPE' as any,
    });

    expect(response.isLeft()).toBe(true);
    expect(categoryRepository.category.length).toBe(0);
  });
});
