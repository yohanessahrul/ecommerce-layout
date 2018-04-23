const mongoose = require('mongoose')
var schema = new mongoose.Schema({
  username: String,
  password: String,
  fullname: String,
  email: String,
  role: String
}, {
  timestamps: true
})
var User = mongoose.model('user', schema)

module.exports = User