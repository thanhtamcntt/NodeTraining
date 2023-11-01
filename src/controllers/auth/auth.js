const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')

exports.postLogin = asyncHandler(
  async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
     return res.status(404).json({
        msg: "Please enter a valid email and password!!",
        success: false,
      })
      // return next(new Error('Please enter a valid email and password!!'));
    }
    
    const user = await User.findOne({email: email})

    if(!user)
    {
      return res.status(404).json({
        msg: "Account information or password is incorrect!!",
        success: false,
      })
      // return next(new Error('account information or password is incorrect!!'));
    }
  
    const passwordUser = await bcrypt.compare(password,user.password,);
  
    if(!passwordUser){
      return res.status(404).json({
        msg: "Account information or password is incorrect!!",
        success: false,
      })
      // return next(new Error('account information or password is incorrect!!'));
    }
    
    const token = await user.getSignedJWTToken();
    res.status(200).json({
      token: token,
      msg: "Login successfully",
      success: true,
      data: user
    })
  
  }
)
exports.postLogout = asyncHandler(
  async (req, res, next) => {
    const token = req.token;

    if (!token) {
      return res.status(401).json({
        msg: "No token found",
        success: false,
      });
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
  
    res.version(1.0).status(200).json({
      msg: "Signup successfully",
      success: true,
      data: user
    })
  
  }
)