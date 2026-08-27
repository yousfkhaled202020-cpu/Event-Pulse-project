const dotenv = require('dotenv').config();
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../../app');

describe('Events Integration Tests', () => {
    afterAll(async () => {
        if (mongoose.connection) {
            await mongoose.connection.close();
        }
    });
    test('GET /api/events should return status 200 OK and array of events', async () => {
        const response = await request(app).get('/api/events').expect(200);
        expect(response.body.status).toBe('success');
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('POST /api/events without JWT token should return 401 Unauthorized', async () => {
        const response = await request(app).post('/api/events').send({ title: 'New Event' }).expect(401);

        expect(response.body).toBeDefined();
    });

    test('POST /api/events with missing required fields should return 422 Unprocessable Entity', async () => {
        const secretKey = process.env.JWT_SECRET || 'your_jwt_secret_here'; 
        const token = jwt.sign(
            { 
                id: 'test-user-id', 
                role: 'admin' 
            }, 
            secretKey
        );
        const response = await request(app).post('/api/events').set('Authorization', `Bearer ${token}`).send({ title: 'New Event' })
        .expect(422);

        expect(response.body.status).toBe('fail');
        expect(Array.isArray(response.body.errors)).toBe(true);
    });

});