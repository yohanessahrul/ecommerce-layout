const mongoose = require('mongoose')
var schema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  description: String,
  image: String
}, {
  timestamps: true
})
var Product = mongoose.model('product', schema)

module.exports = Product