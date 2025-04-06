import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';
import type { App } from 'supertest/types';
import { createAppBalance } from '../app-test/app-test-balance';
import { AmountMustBeGreaterThanZeroError } from '../../../domain/budget-manager/application/use-cases/errors/amount-must-be-greater-than-0-error';

let app: App;

describe('Create Balance Controller (e2e)', () => {
  beforeAll(async () => {
    app = await createAppBalance();
  });

  test('[POST] /balance', async () => {
    const response = await request(app).post('/balance').send({
      user_id: '1',
      amount: 1000,
    });

    expect(response.status).toBe(201);
  });

  test('[POST] /balance User ID error', async () => {
    const response = await request(app).post('/balance').send({
      user_id: '232323dasd',
      amount: 1000,
    });

    expect(response.status).toBe(400);
  });
});
