import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';
import type { App } from 'supertest/types';
import { createAppCategory } from '../app-test/app-test-category';

let app: App;

describe('Create Category Controller (e2e)', () => {
  beforeAll(async () => {
    app = await createAppCategory();
  });

  test('[POST] /category', async () => {
    const response = await request(app).post('/category').send({
      name: 'Alimentação',
      type: 'EXPENSE',
    });

    expect(response.status).toBe(201);
  });

  test('[POST] /category (invalid type)', async () => {
    const response = await request(app).post('/category').send({
      name: 'Alimentação',
      type: 'INVALID TYPE',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid schema' });
  });
});
