const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Create Schema
const OrderSchema = new Schema({
  brand: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },

  description: {
    type: String
  },
  price: {
    type: String,
    required: true
  },
  total: {
    type: Number
  },
  category: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = Order = mongoose.model('orders', OrderSchema)
