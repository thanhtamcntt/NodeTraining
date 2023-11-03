const User = require("../../models/user")
const Roles = require("../../models/roles")
const ErrorResponse = require("../../utils/errorResponse")

const CheckRole = (...roles) => {

  return async (req, res, next) => {
    const user = await User.findById(req.user._id)
    const userRoles = await user.populate('roleId')
    console.log('user: ' + userRoles)
    if(!userRoles)
    {
      next(new ErrorResponse('User does not exist',404));
    }
   
    if(!roles.includes(userRoles.roleId.name))
    {
      next(new ErrorResponse('User does not allow to access route',404));
    }
    next()
  }
}

module.exports = CheckRole