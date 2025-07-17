const express = require('express');
const router = express.Router();
const { addSweets } = require('../controllers/sweetController');

// Add Sweet
router.post('/', addSweets);

module.exports = router;