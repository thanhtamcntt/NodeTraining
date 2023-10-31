const mongoose = require('mongoose')
require('dotenv').config();
const colors = require('colors');

module.exports = async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected'.green);
  } catch (err) {
    console.log(colors.red(err));
  }
}