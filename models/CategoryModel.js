const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true },
    
 description: String,
  createdAt: 
  { type: Date, 
    default: Date.now },

  parentCategory: String,
  isActive: { type: Boolean, default: true }
});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
