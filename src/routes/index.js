const router = require('express').Router();
const authRouter = require('./auth/auth');
const todoRouter = require('./todo/todo');
const paymentRouter = require('./payment/stripe');

router.use('/auth', authRouter)
router.use('/todo', todoRouter)
router.use('/payment', paymentRouter)

module.exports = router