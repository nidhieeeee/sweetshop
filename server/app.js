const express = require('express');
const sweetsRouter = require('./routes/sweets');
const app = express();

app.use(express.json());
app.use('/api/sweets', sweetsRouter);

module.exports = app;
