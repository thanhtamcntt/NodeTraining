const colors = require('colors')

exports.ErrorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message
  error.statusCode = err.statusCode
  console.log("error: ", err)
  console.log("error name: ",colors.red(err.name))
  console.log("error name: ",colors.red(err.message))
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server error"
  })
}