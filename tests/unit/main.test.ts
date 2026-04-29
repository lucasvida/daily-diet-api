import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

describe('Health check', () => {
    beforeAll(async () => await app.ready());
    afterAll(async () => await app.close());

    test('Should be ready', async () => {
        const response = await request(app.server).get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Daily Diet API is running' });
    });

    test.todo('Should be connected to database', async () => {
        const { database } = await import("../../src/database/database.js");
        const response = await database.raw('SELECT 1 as test');
        expect(response).toEqual(expect.arrayContaining([{ test: 1 }]));
    });
});
