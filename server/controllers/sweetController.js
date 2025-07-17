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
    let { sortBy, order } = req.query;
    const validSortFields = ['name', 'price', 'category', 'quantity'];

    // Default sort
    let sortOptions = {};

    if (sortBy) {
      // Validate sortBy field
      if (!validSortFields.includes(sortBy)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid sortBy field. Allowed: name, price, category, quantity',
        });
      }

      // Validate order
      if (order && !['asc', 'desc'].includes(order.toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid order value. Use "asc" or "desc".',
        });
      }

      sortOptions[sortBy] = order?.toLowerCase() === 'desc' ? -1 : 1;
    }

    const sweets = await Sweet.find().sort(sortOptions);

    return res.status(200).json({
      success: true,
      data: sweets,
    });
  } catch (err) {
    console.error('Error fetching sweets:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
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

exports.searchSweets = async (req, res) => {
  try {
    const { name, category, min, max } = req.query;

    // If no query params
    if (!name && !category && !min && !max) {
      return res.status(400).json({
        success: false,
        message: 'At least one query param is required.',
      });
    }

    const query = {};

    // Name search (case-insensitive)
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    // Category search (case-insensitive)
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    // Price Range Validation
    if ((min && isNaN(min)) || (max && isNaN(max))) {
      return res.status(400).json({
        success: false,
        message: 'min and max should be valid numbers.',
      });
    }

    if (min && max && Number(min) > Number(max)) {
      return res.status(400).json({
        success: false,
        message: 'min cannot be greater than max.',
      });
    }

    // Price range query
    if (min || max) {
      query.price = {};
      if (min) query.price.$gte = Number(min);
      if (max) query.price.$lte = Number(max);
    }

    const sweets = await Sweet.find(query);

    return res.status(200).json({
      success: true,
      data: sweets,
    });

  } catch (err) {
    console.error('Search Error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

exports.purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format.',
      });
    }

    // Validate quantity
    if (quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Quantity is required.',
      });
    }

    if (typeof quantity !== 'number' || quantity <= 0) {
      return res.status(422).json({
        success: false,
        message: 'Quantity must be a positive number.',
      });
    }

    // Find sweet
    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found.',
      });
    }

    // Check stock
    if (sweet.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough stock available.',
      });
    }

    // Reduce stock and save
    sweet.quantity -= quantity;
    await sweet.save();

    return res.status(200).json({
      success: true,
      message: 'Purchase successful.',
      data: sweet,
    });
  } catch (err) {
    console.error('Purchase error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

exports.restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format.',
      });
    }

    // Validate quantity
    if (quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Quantity is required.',
      });
    }

    if (typeof quantity !== 'number' || quantity <= 0) {
      return res.status(422).json({
        success: false,
        message: 'Quantity must be a positive number.',
      });
    }

    // Find sweet
    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found.',
      });
    }

    // Increase stock
    sweet.quantity += quantity;
    await sweet.save();

    return res.status(200).json({
      success: true,
      message: 'Sweet restocked successfully.',
      data: sweet,
    });
  } catch (err) {
    console.error('Restock Error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};