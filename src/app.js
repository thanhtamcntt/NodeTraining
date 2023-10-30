const express = require('express');
const app = express();
require('dotenv').config()
console.log(process.env.port)
const PORT = process.env.port ? process.env.port : 4000;


app.listen(PORT, () => {
  console.log(`connect port ${PORT}`)});