const express = require('express');
const router = express.Router();
const { addSweets , getAllSweets , deleteSweetById , searchSweets} = require('../controllers/sweetController');

// Add Sweet
router.post('/', addSweets);
router.get('/' , getAllSweets);
router.delete('/:id', deleteSweetById);
router.get('/search', searchSweets);

module.exports = router;