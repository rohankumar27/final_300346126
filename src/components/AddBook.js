import { NavLink } from "react-router-dom";

import React, { useState } from "react";


const AddBook = (props) => {
    const [getData, setData] = useState({
      title: "",
      author: "",
      description: "",
    
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...getData, [name]: value });
      };
      const handleSubmitButton = (event) => {
        event.preventDefault();
        const { title, author, description} = getData;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, author, description }),
        };
        fetch("http:localhost:5000/api/create-book", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setData({
            title: "",
            description: "",
            author: "",
          });
        })
        .catch((error) => console.log(error));
    };
    return (
        <div>
          <div className="CreateBook">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <br />
                  <NavLink
                    to={{
                      pathname: "/book-list",
                    }}
                  >
                    <a className="btn btn-info float-left" href="/">
                      Show BooK List
                    </a>
                  </NavLink>
                </div>
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Add Book</h1>
                  <p className="lead text-center">Create new book</p>
                  <form novalidate  onSubmit={handleSubmitButton}>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Title of the Book"
                        name="title"
                        className="form-control"
                        value={getData.title}
                        onChange={handleChange}
                        spellcheck="false"
                        data-ms-editor="true"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Author"
                        name="author"
                        className="form-control"
                        value={getData.author}
                        onChange={handleChange}
                        spellcheck="false"
                        data-ms-editor="true"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Describe this book"
                        name="description"
                        className="form-control"
                        value={getData.description}
                        onChange={handleChange}
                        spellcheck="false"
                        data-ms-editor="true"
                      />
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default AddBook;