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
  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/api/sweets').send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/validation/i);
  });

  it('should return 400 if price is not a number', async () => {
    const invalidSweet = {
      name: 'Barfi',
      category: 'Milk-Based',
      price: 'fifty',
      quantity: 10
    };

    const res = await request(app).post('/api/sweets').send(invalidSweet);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/validation/i);
  });

  it('should return 400 if quantity is negative', async () => {
    const invalidSweet = {
      name: 'Peda',
      category: 'Milk-Based',
      price: 15,
      quantity: -5
    };

    const res = await request(app).post('/api/sweets').send(invalidSweet);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/validation/i);
  });

  it('should ignore unknown fields', async () => {
    const sweetWithExtra = {
      name: 'Rasgulla',
      category: 'Milk-Based',
      price: 25,
      quantity: 30,
      madeByAliens: true
    };

    const res = await request(app).post('/api/sweets').send(sweetWithExtra);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).not.toHaveProperty('madeByAliens');
  });

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

  it('should return 400 for invalid ObjectId', async () => {
    const res = await request(app).delete('/api/sweets/invalid-id-123');

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/Invalid ID format/i);
  });

  it('should return 404 if sweet does not exist', async () => {
    const fakeId = '64a06fa2ebd02f6a22993a61'; 
    const res = await request(app).delete(`/api/sweets/${fakeId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Sweet not found.');
  });
});

describe('GET /api/sweets/search', () => {
  beforeEach(async () => {
    await Sweet.insertMany([
      { name: 'Rasgulla', category: 'Milk-Based', price: 25, quantity: 10 },
      { name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 },
      { name: 'Gulab Jamun', category: 'Milk-Based', price: 10, quantity: 30 },
    ]);
  });

  // Search by Name
  it('should return sweets matching name (case-insensitive)', async () => {
    const res = await request(app).get('/api/sweets/search?name=rasgulla');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].name.toLowerCase()).toContain('rasgulla');
  });

  // Search by Category
  it('should return sweets matching category (case-insensitive)', async () => {
    const res = await request(app).get('/api/sweets/search?category=milk-based');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(2);
    expect(res.body.data[0].category.toLowerCase()).toBe('milk-based');
  });

  // Search by Price Range
  it('should return sweets within the given price range', async () => {
    const res = await request(app).get('/api/sweets/search?min=10&max=30');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(2); // Rasgulla (25), Gulab Jamun (10)
  });

  // Combined Query (name + category)
  it('should allow combined queries (e.g., name + category)', async () => {
    const res = await request(app).get('/api/sweets/search?name=jamun&category=milk-based');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].name.toLowerCase()).toContain('jamun');
  });

  // Invalid price values
  it('should return 400 if price values are not numbers', async () => {
    const res = await request(app).get('/api/sweets/search?min=cheap&max=expensive');

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/min and max should be valid numbers/i);
  });

  // Invalid price logic (min > max)
  it('should return 400 if min > max', async () => {
    const res = await request(app).get('/api/sweets/search?min=100&max=10');

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/min cannot be greater than max/i);
  });

  // No matching sweets
  it('should return empty array if no match is found', async () => {
    const res = await request(app).get('/api/sweets/search?name=laddu');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual([]);
  });

  // No query at all
  it('should return 400 if no query parameter is provided', async () => {
    const res = await request(app).get('/api/sweets/search');

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/at least one query param is required/i);
  });
});