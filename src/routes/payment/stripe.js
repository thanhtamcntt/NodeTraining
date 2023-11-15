const router = require('express').Router();
const Payment = require('../../controllers/payment/stripe');
const CheckToken = require('../../middlewares/auth/checkToken');

router.route('/create-checkout-session').post(CheckToken ,Payment.PaymentStripe)
module.exports = router