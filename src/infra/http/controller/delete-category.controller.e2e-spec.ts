import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';
import type { App } from 'supertest/types';
import { createAppCategory } from '../app-test/app-test-category';

let app: App;

describe('Delete Category Controller (e2e)', () => {
  beforeAll(async () => {
    app = await createAppCategory();
  });

  test('[DELETE] /category/:id', async () => {
    const categoryCreate = await request(app).post('/category').send({
      name: 'Category Test',
      type: 'INCOME',
    });

    const id = categoryCreate.body.category.id;

    const response = await request(app).delete(`/category/${id}`);

    expect(response.status).toBe(200);
  });
});
