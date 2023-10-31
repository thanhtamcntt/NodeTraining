const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Role = new Schema({
  name: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
})

module.exports = mongoose.model('Role', Role);