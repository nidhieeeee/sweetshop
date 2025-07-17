const express = require('express');
const router = express.Router();
const { addSweets , getAllSweets , deleteSweetById} = require('../controllers/sweetController');

// Add Sweet
router.post('/', addSweets);
router.get('/' , getAllSweets);
router.delete('/:id', deleteSweetById);

module.exports = router;