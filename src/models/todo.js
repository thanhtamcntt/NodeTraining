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
      required: false
    },
    url: {
      type: String,
      required: false
    }
  },
  videoURL:  {
    videoId : {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: false
    }
  },
  shortDescription: {
    type: String,
    required: false
  },
  description: {
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
    default: Date.now()
  },
  oldTodo : {
    type: Date,
    default: function() {
      let currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 6)
      return currentDate
    }
  },
  updateAt: {
    type: Date
  }
})

module.exports = mongoose.model('Todo', Todo);