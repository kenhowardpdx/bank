import { app, server } from '../index';
import request from 'supertest';

afterAll(() => {
    server.close();
});

describe("server", () => {
    it("has a health route", async () => {
        expect.assertions(1);
        const response = await request(app).get('/api/v1/health');
        expect(response.statusCode).toEqual(200);
    });
});

