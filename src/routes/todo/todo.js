const router = require('express').Router();
const {createTodo, getAllTodo,getDetailTodo, updateTodo, deleteTodo} = require('../../controllers/todo/todo');
const CheckToken = require('../../middlewares/auth/checkToken');
const CheckRole = require('../../middlewares/auth/checkRoles')
const { upload } = require('../../helpers/multer');

router.route('/').get(CheckToken, CheckRole('admin'),getAllTodo)
router.route('/:id').get(CheckToken,getDetailTodo)
router.route('/create-todo').post(CheckToken, CheckRole('admin'),upload , createTodo);
router.route('/update-todo/:id').post(CheckToken, CheckRole('admin'),upload ,updateTodo)
router.route('/delete-todo/:id').post(CheckToken, CheckRole('admin'),deleteTodo)
module.exports = router