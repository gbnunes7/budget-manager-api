import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';
import type { App } from 'supertest/types';
import { createAppFinancialGoals } from '../app-test/app-test-financial-goals';
import { UniqueEntityId } from '../../../core/entitites/unique-entity-id';

let app: App;

describe('Delete Financial Goals Controller (e2e)', () => {
  beforeAll(async () => {
    app = await createAppFinancialGoals();
  });

  test('[DELETE] /financial-goals/:id', async () => {
    const financialGoals = await request(app)
      .post('/financial-goals/user')
      .send({
        description: 'Buy a new car',
        goalDate: new Date('2027-12-31'),
        goalValue: 10000,
        userId: '1',
      });

    const response = await request(app)
      .delete(`/financial-goals/${financialGoals.body.financialGoals.id}`)
      .send();

    expect(response.status).toBe(200);
  });

  test('[DELETE] /financial-goals/:id - Financial goal not found', async () => {
    const response = await request(app).delete('/financial-goals/123').send();

    expect(response.status).toBe(404);
  });
});
