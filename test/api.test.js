const request = require('supertest');
const { app, server } = require('../index.html');

describe('API Routes', () => {
    
});
afterAll((done) => {
    server.close(done);
});