import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';
import type { App } from 'supertest/types';
import { UniqueEntityId } from '../../../core/entitites/unique-entity-id';
import { createAppTransaction } from '../app-test/app-test-transaction';

let app: App;

describe('Filter Transaction Controller (e2e)', () => {
  beforeAll(async () => {
    app = await createAppTransaction();
  });

  test('[POST] /transactions/filter 4 responses', async () => {
    const response = await request(app).post('/transaction/filter').send({
      userId: '1',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(4);
  });

  test('[POST] /transactions/filter 2 responses', async () => {
    const response = await request(app).post('/transaction/filter').send({
      userId: '1',
      startDate: '2023-01-01',
      endDate: '2023-01-02',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
