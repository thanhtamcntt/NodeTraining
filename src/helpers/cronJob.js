const cron = require('node-cron');
const Todo = require('../models/todo');

cron.schedule('0 0 0 1 3,6,9,12 *', async() => {
  const currentDate = new Date();
  await Todo.deleteMany({ oldTodo : { $lt: currentDate}})

});