const router = require('express').Router();
const LoginController = require('../../controllers/auth/auth');
const {CheckToken} = require('../../middlewares/auth/check-token');

router.route('/login').post(LoginController.postLogin)
router.route('/signup').post(LoginController.postSignup)
router.route('/logout').post(CheckToken ,LoginController.postLogout)
module.exports = router
