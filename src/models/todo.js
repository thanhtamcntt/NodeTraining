const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Todo = new Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  imageURL: {
    imageId : {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  videoURL: {
    type: String,
    required: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Todo', Todo);