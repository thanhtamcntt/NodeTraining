const express = require('express');
const ConnectDb = require('./config/configdb');

const app = express();
require('dotenv').config()
const multer  = require('multer')
const path = require('path')
const fs = require('fs')
console.log(process.env.PORT)

const PORT = process.env.PORT ? process.env.PORT : 4000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

function fileFilter (req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
}

app.use(multer({storage: storage, fileFilter: fileFilter}).single('imageURL'))

app.use(express.json());
const Router = require('./routes/index')
const ErrorHandler = require('./middlewares/error');

app.use('/', Router)

app.use(ErrorHandler.ErrorHandler)

ConnectDb();

app.listen(PORT, () => {
  console.log(`connect port ${PORT}`)});