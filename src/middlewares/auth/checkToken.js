const fs = require('fs')
const path = require('path');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../../utils/errorResponse');

const CheckToken = asyncHandler(async (req,res,next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
  {
    token = req.headers.authorization.split(' ')[1];
  }
  try {
    const ServerCert = fs.readFileSync(path.join(__dirname, '../../../server.cert'));
    const decodedToken = await jwt.verify(token, ServerCert,  { algorithm: 'RS256' });
    const user = await User.findById(decodedToken.id);
    if(!user) {
      next(new ErrorResponse('User does not exist',404));
    }
    req.token = token;
    req.user = user;
    
    next();
  } catch (error) {
    next(new ErrorResponse('Token is not default',404));
  }
})

module.exports = CheckToken