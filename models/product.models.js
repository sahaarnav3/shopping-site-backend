const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  shortTitle: {
    type: String,
    required: true,
  },
  fullTitle: {
    type: String,
    required: true,
  },
  mrpPrice: {
    type: Number,
    required: true,
  },
  finalPrice: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  size: {
    type: [String],
    required: true
  },
  description: {
    type: [String],
    required: true
  },
  imageLink: {
    type: String,
    required: true
  },
  addedToWishlist: {
    type: Boolean,
    default: false
  },
  addedToCart: {
    type: [String],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
