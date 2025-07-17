const express = require('express');
const router = express.Router();
const { addSweets , getAllSweets } = require('../controllers/sweetController');

// Add Sweet
router.post('/', addSweets);
router.get('/' , getAllSweets)

module.exports = router;