const Sweet = require('../models/Sweet');
const mongoose = require('mongoose');

// POST /sweets
exports.addSweets = async (req, res) => {
  try {
    const sweet = new Sweet(req.body);
    const saved = await sweet.save();

    return res.status(201).json({
      success: true,
      message: 'Sweet added successfully.',
      data: saved,
    });
  } catch (err) {
    // Mongoose validation error handler
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }

    console.error('Error adding sweet:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};



// GET /sweets
exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();

    return res.status(200).json({
      success: true,
      message: 'Fetched all sweets successfully.',
      data: sweets,
    });
  } catch (err) {
    console.error('Error fetching sweets:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.message,
    });
  }
};

exports.deleteSweetById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check for valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format.',
      });
    }

    const deletedSweet = await Sweet.findByIdAndDelete(id);

    if (!deletedSweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Sweet deleted successfully.',
    });
  } catch (err) {
    console.error('Error deleting sweet:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.message,
    });
  }
};