const express = require('express');
const sweetsRouter = require('./routes/sweets');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());
app.use('/api/sweets', sweetsRouter);

module.exports = app;
