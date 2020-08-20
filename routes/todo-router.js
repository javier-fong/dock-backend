const express = require('express');
const router = express.Router();

const TodoController = require('../controllers/todo-controller');

router.post('/todo', TodoController.createTodo);
router.get('/todos', TodoController.getTodos);
router.put('/todo/:id', TodoController.updateTodo);
router.delete('/todo/:id', TodoController.deleteTodo);

module.exports = router;