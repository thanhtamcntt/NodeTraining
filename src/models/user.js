const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: {
    type: String,
  },
  tokenExpiration: {
    type: Date
  },
  roleId : {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

User.methods.getSignedJWTToken = async function() {
  const serverKey = await fs.readFileSync(path.join(__dirname, '../../server.key'))
  const token = await jwt.sign({ id : this._id }, serverKey, { algorithm: 'RS256' }, { expiresIn: '1h' });
  return token;
}

module.exports = mongoose.model('User', User);