const express = require('express');
const app = express();
require('dotenv').config()
console.log(process.env.PORT)
const PORT = process.env.PORT ? process.env.PORT : 4000;


app.listen(PORT, () => {
  console.log(`connect port ${PORT}`)});