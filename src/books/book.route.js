const express = require("express");
const {
  postBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("./book.controller");
const router = express.Router();

router.post("/create-book", postBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/edit/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
