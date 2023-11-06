const Todo = require('../../models/todo')
const asyncHandler = require('express-async-handler')
const { UploadFile, DeleteFileImage } = require('../../helpers/uploadFileImage')
const colors = require('colors')
const ErrorResponse = require('../../utils/errorResponse');

exports.getAllTodo = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find();
  console.log(todos)
  res.status(200).json({
    success: true,
    data: todos,
    count: todos.length,
    msg: "Get all todo successfully"
  })
})

exports.getDetailTodo = asyncHandler(async (req, res, next) => {

  const todo = await Todo.findOne({_id: req.params.id});
  console.log(todo)
  if(!todo)
  {
    next(new ErrorResponse(`Todo with id ${req.params.id} does not exist`,404));
  }
  res.status(200).json({
    success: true,
    data: todo,
    msg: `Get todo ${req.params.id} successfully`
  })
})

exports.createTodo = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  if(!req.file) {
      next(new ErrorResponse(`Please enter a valid file image`,404));
  }
  
  if(!title) {
    next(new ErrorResponse(`Please enter a valid title`,404));
  }
  console.log('req.file: ' + colors.yellow(req.file))
  const share = true
  const infoImage = await UploadFile(req.file, share);

  const todo = await Todo.create({title: title, completed: false, imageURL: infoImage ,userId: req.user._id});

  res.status(201).json({
    success: true,
    data: todo,
    msg: "Create todo successfully"
  })
})

exports.updateTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findOne({_id: req.params.id});
  if(!todo)
  {
    next(new ErrorResponse(`Todo with id ${req.params.id} does not exist`,404));
  }
  if(req.file) {
    await DeleteFileImage(todo.imageURL.imageId)
    const share = true
    const infoImage = await UploadFile(req.file, share);
    await todo.updateOne({title: req.body.title, imageURL: infoImage ,completed: req.body.completed});
  }
  
  else {
    await todo.updateOne({title: req.body.title ,completed: req.body.completed});
  }


 
  res.status(200).json({
    success: true,
    msg: `Updatete todo ${req.params.id} successfully`
  })
})

exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findOne({_id: req.params.id});
  if(!todo)
  {
    next(new ErrorResponse(`Todo with id ${req.params.id} does not exist`,404));
  }
  await DeleteFileImage(todo.imageURL.imageId)
  await Todo.deleteOne({_id: req.params.id})
  res.status(200).json({
    success: true,
    data: [],
    msg: `Delete todo ${req.params.id} successfully`
  })
})