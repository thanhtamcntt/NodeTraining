const router = require('express').Router();
const LoginController = require('../../controllers/auth/auth');
const CheckToken = require('../../middlewares/auth/checkToken');

router.route('/login').post(LoginController.postLogin)
router.route('/signup').post(LoginController.postSignup)
router.route('/logout').post(CheckToken ,LoginController.postLogout)
router.route('/reset-password').post(LoginController.postResetPassword)
router.route('/new-password').post(LoginController.postNewPassword)
module.exports = router
