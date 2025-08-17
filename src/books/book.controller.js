const Book = require("./book.model");

const postBook = async (req, res, next) => {
  try {
    const newBook = await new Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: "book posted successfully", book: newBook });
  } catch (error) {
    console.error("error creating book", error);
    res.status(500).send({ message: "failed to add book" });
  }
  //
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("Error while fetching books", error);
    res.status(500).send({ message: "Failed to get book" });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "book not found" });
    } else res.status(200).send(book);
  } catch (error) {
    console.error("Error while fetching book", error);
    res.status(500).send({ message: "Failed to get book" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookUpdated = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!bookUpdated) {
      res.status(404).send({ message: "Book not found" });
    } else
      res
        .status(200)
        .send({ book: bookUpdated, message: "Book updated successfully" });
  } catch (error) {
    console.error("Error while updating book", error);
    res.status(500).send({ message: "Failed to update book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      res.status(404).send({ message: "Book not found" });
    } else
      res
        .status(200)
        .send({ book: book, message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error while deleting book", error);
    res.status(500).send({ message: "Failed to delete book" });
  }
};

module.exports = {
  postBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
