'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);

const { db } = require('../src/models');

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});


describe('Testing the dog router', () => {

  it('should read ALL from dogs data', async () => {
    const response = await request.get('/dog');

    expect(response.status).toEqual(200);
    expect(response.body.count).toBeDefined();
    expect(response.body.results).toBeDefined();
  });

  it('should read ONE from dogs data', async () => {
    const response = await request.get('/dog/1');

    expect(response.status).toEqual(200);
    expect(response.body.count).toEqual(1);
    expect(response.body.results).toBeDefined();
  });

  it('should CREATE one from dogs data', async () => {
    const response = await request.post('/dog').send({type: "test", size: "test"});
    expect(response.status).toEqual(201);
  });

  it('should UPDATE one from dogs data', async () => {
    const response = await request.put('/dog/1').send({type: "test"});
    expect(response.status).toEqual(202);
  });

  it('should DELETE one from dogs data', async () => {
    const response = await request.delete('/dog/1');
    expect(response.status).toEqual(204);
  });
});