import Book from '../model/book.model.js';

export const getBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json(error);
  }
};

export const createBook = async (req, res) => {
  try {
    const { name, category, title, price, image } = req.body;

    if (!name || !category || !title || !price || !image) {
      return res.status(400).json({
        message: 'Send all required fields: title, category, image, name, price',
      });
    }

    const newBook = { name, category, title, price, image };

    const book = await Book.create(newBook);

    return res.status(201).json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
