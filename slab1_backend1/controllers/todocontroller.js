const Todo = require('../models/Todo');

// Create a new Todo
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({ title, description });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: 'Error creating todo', error: err });
  }
};

// Update a Todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ message: 'Error updating todo', error: err });
  }
};

// Delete a Todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting todo', error: err });
  }
};

// Mark Todo as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ message: 'Error marking todo as read', error: err });
  }
};

module.exports = { createTodo, updateTodo, deleteTodo, markAsRead };
