const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Todo = new Schema({
  title: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Todo', Todo);