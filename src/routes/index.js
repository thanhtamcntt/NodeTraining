const router = require('express').Router();
const authRouter = require('./auth/auth');
const todoRouter = require('./todo/todo');

router.use('/auth', authRouter)
router.use('/todo', todoRouter)

module.exports = router