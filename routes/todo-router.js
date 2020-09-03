const express = require('express');
const router = express.Router();

const TodoController = require('../controllers/todo-controller');
const todoController = require('../controllers/todo-controller');

router.post('/todoList', todoController.createToDoList);
router.get('/todos/:email', TodoController.getTodos);
router.put('/todo/item/:id', TodoController.addToDoItems);
router.put('/todo/completed/:id', TodoController.updateTodoCompleted);
router.put('/todo/list/:id', TodoController.updateToDoListName);
router.delete('/todo/item/:id', TodoController.deleteToDoItem);
router.delete('/todo/list/:id', TodoController.deleteToDoList);

module.exports = router;