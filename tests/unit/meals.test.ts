import { describe, test, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import { database } from '../../src/database/database.js';

describe('Meals routes', () => {
  beforeAll(async () => {
    await app.ready();
    await database.migrate.latest();
  });

  afterAll(async () => {
    await app.close();
    await database.destroy();
  });

  beforeEach(async () => {
    await database('meals').delete();
    await database('users').delete();
  });

  async function createUserAndGetCookie(): Promise<string> {
    const response = await request(app.server)
      .post('/users')
      .send({ name: 'Test User' });

    const setCookie = response.headers['set-cookie'] as string | string[];
    return Array.isArray(setCookie) ? setCookie[0] : setCookie;
  }

  test('POST /meals - creates meal and returns 201', async () => {
    const cookie = await createUserAndGetCookie();

    const response = await request(app.server)
      .post('/meals')
      .set('Cookie', cookie)
      .send({
        name: 'Frango com arroz',
        description: 'Almoço saudável',
        date_time: '2026-05-16T12:00:00.000Z',
        is_on_diet: true,
      });

    expect(response.statusCode).toBe(201);
  });

  test('POST /meals - returns 401 without session cookie', async () => {
    const response = await request(app.server)
      .post('/meals')
      .send({
        name: 'Frango com arroz',
        description: 'Almoço saudável',
        date_time: '2026-05-16T12:00:00.000Z',
        is_on_diet: true,
      });

    expect(response.statusCode).toBe(401);
  });

  test('POST /meals - returns 400 with invalid body', async () => {
    const cookie = await createUserAndGetCookie();

    const response = await request(app.server)
      .post('/meals')
      .set('Cookie', cookie)
      .send({ name: 'only name' });

    expect(response.statusCode).toBe(400);
  });

  test('POST /meals - meal is linked to session user', async () => {
    const cookie = await createUserAndGetCookie();

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookie)
      .send({
        name: 'Salada',
        description: 'Leve',
        date_time: '2026-05-16T12:00:00.000Z',
        is_on_diet: true,
      });

    const sessionId = cookie.split('=')[1].split(';')[0];
    const user = await database('users').where({ session_id: sessionId }).first();
    const meal = await database('meals').where({ user_id: user.id }).first();

    expect(meal).toBeDefined();
    expect(meal.name).toBe('Salada');
    expect(meal.user_id).toBe(user.id);
  });
});
