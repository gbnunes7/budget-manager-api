import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';
import type { App } from 'supertest/types';
import { UniqueEntityId } from '../../../core/entitites/unique-entity-id';
import { createAppTransaction } from '../app-test/app-test-transaction';

let app: App;

describe('Delete Transaction Controller (e2e)', () => {
  beforeAll(async () => {
    app = await createAppTransaction();
  });

  test('[DELETE] /transactions/:id', async () => {
    const responseDelete = await request(app).delete('/transaction/1');

    expect(responseDelete.status).toBe(200);
  });

  test('[DELETE] /transactions/:id - Transaction not found', async () => {
    const response = await request(app).delete(
      `/transactions/'non-existing-id'`,
    );
    expect(response.status).toBe(404);
  });
});
