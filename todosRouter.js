const express = require('express');
const router = express.Router();
const {/*login,*/getTodos,createTodo,getTodo,updateTodo,deleteTodo} = require("./todosController");
const {login} = require("./usersController");
const {authMiddleware}=require("./authMiddleware")


router.post('/login', login);
router.get('/', authMiddleware, getTodos, (req, res) => {
    res.send(req.todos);
});
router.post('/', authMiddleware, createTodo);
router.get('/:id', authMiddleware, getTodo, (req, res) => {
    res.send(req.todo);
});
router.put('/:id', authMiddleware, updateTodo);
router.delete('/:id', authMiddleware, deleteTodo);

module.exports = router;