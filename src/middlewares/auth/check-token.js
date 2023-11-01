const fs = require('fs')
const path = require('path');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

exports.CheckToken = asyncHandler(async (req,res,next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
  {
    token = req.headers.authorization.split(' ')[1];
  }
  try {
    const ServerCert = fs.readFileSync(path.join(__dirname, '../../../server.cert'));
    const decodedToken = await jwt.verify(token, ServerCert,  { algorithm: 'RS256' });
    const user = await User.findById(decodedToken.id);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    return res.status(404).json({
      msg: "Token not found!!",
      success: false,
    })
  }
})