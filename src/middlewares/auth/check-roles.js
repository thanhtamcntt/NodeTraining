const User = require("../../models/user")


exports.CheckRole =(...roles) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user._id).populate('roleId');
    if(!user)
    return res.status(404).json({
      msg: "Not exist user!!",
      success: false,
    })

    if(!roles.includes(user.roleId.name))
    {
      return res.status(404).json({
        msg: "User not allow to access route",
        success: false,
      })
    }
  }
 

}