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
    console.log(req.body);
    
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

export const updateBook =  async (req, res) => {
  try {
    const { name, category, price, title, image } = req.body;

    // Validate request body
    if (!name || !category || !price || !title || !image) {
      return res.status(400).json({
        message: 'Send all required fields: name, category, price, title, image',
      });
    }

    const { id } = req.params;

    // Find and update the book
    const result = await Book.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the update follows the schema validation
    });

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json({ message: 'Book updated successfully', book: result });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
}


