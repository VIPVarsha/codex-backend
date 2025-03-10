
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/Book');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// CRUD Operations

// Create a new book
app.post('/books', async (req, res) => {
  try {
    const { title, author, genre, publicationYear, availability } = req.body;
    const newBook = new Book({ title, author, genre, publicationYear, availability });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: 'Error creating book' });
  }
});

// Read all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});

// Read a single book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching book' });
  }
});

// Update a book
app.put('/books/:id', async (req, res) => {
  try {
    const { title, author, genre, publicationYear, availability } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, publicationYear, availability },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: 'Error updating book' });
  }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book' });
  }
});

// Search for books by title or author
app.get('/search', async (req, res) => {
  const { title, author } = req.query;
  try {
    const query = {};
    if (title) query.title = new RegExp(title, 'i');
    if (author) query.author = new RegExp(author, 'i');

    const books = await Book.find(query);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error searching books' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
