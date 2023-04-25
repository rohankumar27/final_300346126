const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
 require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
    next();
  });
app.use(cors());
app.use(express.json());


const bookList = new mongoose.Schema({
    title: String,
    author: String,
    description:  String,
    //{type :String, required: true}
  });

  const BookModel = mongoose.model("book-List", bookList);

  app.get("/api/book-list", async (req, res) => {
    const booksList = await BookModel.find();
    res.json(booksList);
  });

  // Delete by id Query

  app.delete("/api/book-list/:id", async (req, res) => {
    try {
      const bookId = req.params.id;
      console.log(bookId)
      const deletedBook = await BookModel.findByIdAndDelete(bookId);
      if (!deletedBook) {
        return res.status(404).send({ error: "Book not found" });
      }
      res.send(deletedBook);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal server error" });
    }
  });

  
  app.post("/api/create-book", async (req, res) => {
    try {

      const bookData = req.body;

      const newBook = new BookModel(bookData);
  
      newBook
        .save()
        .then(() => res.status(201).json({ message: "Book Added successfully!" }))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (error) {
      console.error(error);
    }
  });


  const uri = "mongodb+srv://kumarr15:123@cluster0.euenfk3.mongodb.net/Final?retryWrites=true&w=majority";
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
  const connection = mongoose.connection;
  connection.once("open", () => {
   console.log("MongoDB database connection established successfully");
  });

// app.use('/todos', todoRouter);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});