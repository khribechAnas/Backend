const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  thumbnail: String,
  images: [String],
  price: Number,
  compareAtPrice: Number,
  SKU: String,
  variants: [String], 
  stockQty: Number,
  reviews: [String], 
  category: String,
  status: String,
  tags: [String],
  createdBy: String,
  averageRating: Number,
  isFeatured: Boolean,
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
}, { timestamps: true }); 

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
