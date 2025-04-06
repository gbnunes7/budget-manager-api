import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';
import { createApp } from '../app-test/app-test-register';
import type { App } from 'supertest/types';

let app: App;

describe('Create User Controller (e2e)', () => {
  beforeAll(async () => {
    app = await createApp();
  });

  test('[POST] /register', async () => {
    const response = await request(app).post('/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: 'password123',
    });

    expect(response.status).toBe(201);
  });

  test('[POST] /register error', async () => {
    const response = await request(app).post('/register').send({
      email: 'johndoe@example.com',
    });

    expect(response.status).toBe(400);
  });

  test('[POST] /register error', async () => {
    await request(app).post('/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: 'password123',
    });

    const response = await request(app).post('/register').send({
      name: 'Jane Doe',
      email: 'johndoe@example.com',
      passwordHash: 'password456',
    });

    expect(response.status).toBe(409);
  });
});
