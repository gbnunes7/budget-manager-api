import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';
import type { App } from 'supertest/types';
import { createAppTransaction } from '../app-test/app-test-transaction';
import { prismaInstance } from '../../prisma/prisma';
import { UniqueEntityId } from '../../../core/entitites/unique-entity-id';

let app: App;

describe('Create Transaction Controller (e2e)', () => {
  beforeAll(async () => {
    app = await createAppTransaction();
  });

  test('[POST] /transaction', async () => {
    const response = await request(app).post('/transaction').send({
      userId: '1',
      amount: 100,
      description: 'Test transaction',
      type: 'INCOME',
      balanceId: '1',
      categoryId: '1',
      date: new Date(),
    });

    expect(response.status).toBe(201);
  });

  test('[POST] /transaction (invalid schema)', async () => {
    const response = await request(app).post('/transaction').send({
      userId: '1',
      amount: 'invalid_amount', 
      description: 'Test invalid amount',
      type: 'INCOME',
      balanceId: '1',
      categoryId: '1',
      date: new Date(),
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Invalid schema',
      }),
    );
  });

  test('[POST] /transaction (missing fields)', async () => {
    const response = await request(app).post('/transaction').send({
      userId: '1',
      amount: 100,
      description: 'Missing balanceId and categoryId',
      type: 'INCOME',
      date: new Date(),
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Invalid schema',
      }),
    );
  });

  test('[POST] /transaction (invalid business rule)', async () => {
    const response = await request(app).post('/transaction').send({
      userId: '1',
      amount: 100,
      description: 'Invalid user, balance or category',
      type: 'INCOME',
      balanceId: 'non-existent-balance-id',
      categoryId: 'non-existent-category-id',
      date: new Date(),
    });

    expect(response.status).toBe(500);
   
  });
});
