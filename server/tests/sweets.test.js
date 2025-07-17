const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Sweet = require('../models/Sweet');

// Connect to the test database before running any tests
beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/sweetshop_test');
});

// Clean up the database and close the connection after all tests
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

// Remove all sweets after each test to ensure test isolation
afterEach(async () => {
  await Sweet.deleteMany();
});

describe('POST /api/sweets', () => {
  it('should create a new sweet', async () => {
    // Define a new sweet object
    const newSweet = {
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20,
    };

    // Send POST request to create the sweet
    const res = await request(app).post('/api/sweets').send(newSweet);

    // Assert the response
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Kaju Katli');
    expect(res.body.data.price).toBe(50);
  });
});

describe('GET /api/sweets', () => {
  it('should return an array of all sweets', async () => {
    // Insert sample sweets into DB
    const sweet1 = {
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    };

    const sweet2 = {
      name: 'Gulab Jamun',
      category: 'Milk-Based',
      price: 10,
      quantity: 50
    };

    // Create two sweets in the database
    await request(app).post('/api/sweets').send(sweet1);
    await request(app).post('/api/sweets').send(sweet2);

    // Send GET request to fetch all sweets
    const res = await request(app).get('/api/sweets');

    // Assert the response contains both sweets
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(2);
    expect(res.body.data[0]).toHaveProperty('name');
    expect(res.body.data[1].category).toBe('Milk-Based');
  });
});

describe('DELETE /api/sweets/:id', () => {
  it('should delete the sweet by ID', async () => {
    // First, add a sweet
    const sweet = {
      name: 'Gulab Jamun',
      category: 'Milk-Based',
      price: 10,
      quantity: 50
    };

    const addRes = await request(app).post('/api/sweets').send(sweet);
    const sweetId = addRes.body.data._id;

    // Now delete it
    const res = await request(app).delete(`/api/sweets/${sweetId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Sweet deleted successfully.');

    // Confirm deletion
    const fetchRes = await request(app).get('/api/sweets');
    expect(fetchRes.body.data.length).toBe(0);
  });

  it('should return 404 if sweet does not exist', async () => {
    const fakeId = '64a06fa2ebd02f6a22993a61'; 
    const res = await request(app).delete(`/api/sweets/${fakeId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Sweet not found.');
  });
});