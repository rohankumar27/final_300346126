
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import "../App.css"

function BookList() {
    const [books, setBooks] = useState([]);
  
    useEffect(() => {
      axios
        .get("https://final-300346126.onrender.com/api/book-list")
        .then((res) => {
          setBooks(res.data);
        })
        .catch((err) => {
          console.log("Error from Book List");
        });
    }, []);


      const handleDelete = (id) => {
        const requestOptions = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        };
        
        fetch(`https://final-300346126.onrender.com/api/book-list/${id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setBooks(books.filter(book => book._id !== id)); 
          })
          .catch((error) => console.log(error));
      };
      
      const bookList = books.length === 0
        ? 'there is no book record!'
        : books.map((book, k) => (
            <BookCard
              title={book.title}
              author={book.author}
              desc={book.description}
              _id={book._id}
              handleDelete={() => handleDelete(book._id)}
            />
          ));
  
    return (
      <div className="BookList">
        <div className="col-md-12">
          <br />
          <h2 className="display-4 text-center">Books List : {books.length}</h2>
        </div>
        <div className="col-md-11">
          <a className="btn btn-info float-right" href="/create-book">
            + Add New Book
          </a>
          <br />
          <br />
          <hr />
        </div>
         <div className='list'>{bookList}</div>
      </div>
    );
  
}  
export default BookList;