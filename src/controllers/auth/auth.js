const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const ErrorResponse = require('../../utils/errorResponse')
const randomBytes = require('randombytes');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
require('dotenv').config()

var options = {
  auth: {
      api_key: process.env.SENGRID_KEY
  }
}
var mailer = nodemailer.createTransport(sgTransport(options));

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

exports.postResetPassword = asyncHandler(
  async (req, res, next) => {
    const { email} = req.body;
    
    randomBytes(32, async (err, resp) => {
        const emailUser = await User.findOne({email: email})
        console.log(resp)
        const token = resp.toString('hex')
        if(!emailUser) {
          next(new ErrorResponse('Email user does not exist!!',404));
        }
        emailUser.resetToken = token
        emailUser.tokenExpiration = Date.now() + 1800000
        await emailUser.save()
        const sendMail = {
          to: email,
          from: 'hoangphuocloc.phurieng@gmail.com',
          subject: 'Reset Password',
          text: `Hello ${email}`,
          html: `You please click <a href="http://localhost:4000/auth/new-password/:${token}">link</a> to retrieve your password`
      };
       
      mailer.sendMail(sendMail, function(err, res) {
          if (err) { 
              console.log(err) 
          }
          console.log(res);
      });

      res.status(200).json({
        msg: "Successfully",
        success: true,
        data: emailUser
      })
    })
  }
)

exports.postNewPassword = asyncHandler(
  async (req, res, next) => {
    const  { newPassword, confirmNewPassword, token } = req.body;
    console.log(token);
    const user = await User.findOne({resetToken: token , tokenExpiration : { $gt: Date.now()} });
    console.log("user", user)
    if(!user) {
      next(new ErrorResponse('User does not exist!!',404));
    }

    if(newPassword !== confirmNewPassword) {
      next(new ErrorResponse('Passwords do not match',422));
    }
    else {
      const hashPassword = await bcrypt.hash(newPassword, 12)
      user.password = hashPassword
      user.resetToken = ""
      await user.save()
      res.status(200).json({
        msg: "Reset password successfully",
        success: true,
      })
    }
  }
)