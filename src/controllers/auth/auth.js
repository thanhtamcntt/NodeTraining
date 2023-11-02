const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const ErrorResponse = require('../../utils/errorResponse')

exports.postLogin = asyncHandler(
  async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;
    if(!email || !password) {
      next(new ErrorResponse('Please enter a valid email and password!!',404));
    }
    
    const user = await User.findOne({email: email})
    if(!user)
    {
      next(new ErrorResponse('account information or password is incorrect!!',404));
    }
  
    const passwordUser = await bcrypt.compare(password,user.password);
    console.log(passwordUser);
    if(!passwordUser){
       next(new ErrorResponse('account information or password is incorrect!!',404));
    }
    else {
      const token = await user.getSignedJWTToken();
      res.status(200).json({
        token: token,
        msg: "Login successfully",
        success: true,
        data: user
      })
    }
  }
)
exports.postLogout = asyncHandler(
  async (req, res, next) => {
    const token = req.token;

    if (!token) {
      next(new ErrorResponse('No token found',401));
    }

    req.token = null;

    res.status(200).json({
      msg: "Logout successfully",
      success: true,
    });
  }
)


//code thêm user nhanh không kiểm tra thành phần
exports.postSignup = asyncHandler(
  async (req, res, next) => {
    const {name, email, password, roleId} = req.body;
    const passwordUser = await bcrypt.hash(password, 12);
    const user = await User.create({name: name, email: email, password: passwordUser, roleId: roleId});
  
    res.status(200).json({
      msg: "Signup successfully",
      success: true,
      data: user
    })
  
  }
)