import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';
import type { App } from 'supertest/types';
import { createAppSession } from '../app-test/app-test-session';

let app: App;

describe('Create User Controller (e2e)', () => {
  beforeAll(async () => {
    app = await createAppSession();
  });

  test('[POST] /session', async () => {
    const response = await request(app).post('/session').send({
      email: 'johndoe@example.com',
      passwordHash: 'password123',
    });

    expect(response.status).toBe(200);
  });

  test('[POST] /session (wrong schema)', async () => {
    const response = await request(app).post('/session').send({
      email: '',
      passwordHash: 'password123',
    });

    expect(response.status).toBe(400);
  });

  test('[POST] /session (invalid credentials email)', async () => {
    const response = await request(app).post('/session').send({
      email: 'teste@teste.com',
      passwordHash: 'password123',
    });

    expect(response.status).toBe(401);
  });

  test('[POST] /session (invalid credentials password)', async () => {
    const response = await request(app).post('/session').send({
      email: 'johndoe@example.com',
      passwordHash: 'password1223',
    });

    expect(response.status).toBe(401);
  });
});
