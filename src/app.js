const express = require('express');
const ConnectDb = require('./config/configdb');

const app = express();
require('dotenv').config()
console.log(process.env.PORT)
const PORT = process.env.PORT ? process.env.PORT : 4000;

app.use(express.json());
const Router = require('./routes/index')
const ErrorHandler = require('./middlewares/error');

app.use('/', Router)

app.use(ErrorHandler.ErrorHandler)

ConnectDb();

app.listen(PORT, () => {
  console.log(`connect port ${PORT}`)});