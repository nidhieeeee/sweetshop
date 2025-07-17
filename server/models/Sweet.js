const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
   name: {
    type: String,
    required: [true, 'Sweet name is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
 price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a non-negative number'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity must be a non-negative number'],
  },
}, { versionKey: false });

module.exports = mongoose.model('Sweet', sweetSchema);