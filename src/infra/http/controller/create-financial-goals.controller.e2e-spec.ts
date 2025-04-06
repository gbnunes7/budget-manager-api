import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';
import type { App } from 'supertest/types';
import { createAppFinancialGoals } from '../app-test/app-test-financial-goals';

let app: App;

describe('Create Financial Goals Controller (e2e)', () => {
  beforeAll(async () => {
    app = await createAppFinancialGoals();

    
  });

  test('[POST] /financial-goals/user', async () => {
    const response = await request(app)
      .post('/financial-goals/user')
      .send({
        description: 'Buy a new car',
        goalDate: new Date('2027-12-31'),
        goalValue: 10000,
        userId: '1',
      });

    expect(response.status).toBe(201);
  });

  test('[POST] /financial-goals/user (wrong schema)', async () => {
    const response = await request(app).post('/financial-goals/user').send({
      user_id: '1',
      goal: 'Buy a new car',
      value: 10000,
      date: '2022-12-31',
    });

    expect(response.status).toBe(400);
  });
});
