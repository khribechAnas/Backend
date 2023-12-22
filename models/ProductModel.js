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
  categoryId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please enter the user ID"],
  },
  status: String,
  tags: [String],
  createdByUserId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "Please enter the user ID"],
  },
  averageRating: Number,
  isFeatured: Boolean,
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
}, { timestamps: true }); 

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
