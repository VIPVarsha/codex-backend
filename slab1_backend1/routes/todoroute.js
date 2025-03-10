const express = require('express');
const { createTodo, updateTodo, deleteTodo, markAsRead } = require('../controllers/todoController');
const router = express.Router();

router.post('/todos', createTodo);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);
router.patch('/todos/:id/read', markAsRead);

module.exports = router;
