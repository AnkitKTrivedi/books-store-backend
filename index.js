const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");

const bookRoutes = require("./src/books/book.route");
app.use(express.json());
app.use(
  cors({
    origin: ["https://booksonlinestore.netlify.app"],
    credentials: true,
  })
);
app.use("/api/books", bookRoutes);

const port = process.env.PORT || 5000;

main().catch((err) => console.log(err));

main()
  .then(() => console.log("mongo connected succesfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URI);
}

app.get("/", (req, res) => {
  res.send("Hello worldbook");
});

app.listen(port, () => {
  console.log("App is running on port", port);
});
