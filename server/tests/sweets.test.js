const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Sweet = require('../models/Sweet');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/sweetshop_test');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Sweet.deleteMany();
});

describe('POST /api/sweets', () => {
  it('should create a new sweet', async () => {
    const newSweet = {
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20,
    };

    const res = await request(app).post('/api/sweets').send(newSweet);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Kaju Katli');
    expect(res.body.data.price).toBe(50);
  });
});