const request = require('supertest');
const { app, server } = require('../server');

describe('API Routes', () => {
    
});
afterAll((done) => {
    server.close(done);
});