const request = require('supertest');
const { app, server } = require('../index');

describe('API Routes', () => {
    
});
afterAll((done) => {
    server.close(done);
});