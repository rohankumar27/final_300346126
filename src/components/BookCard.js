
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function BookCard(props) {
    const { title, desc, author, _id, handleDelete } = props;

    return (
        <div class="card-container">
            <img
              src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
              alt="Books"
              height="200"
            />
            
            <div class="desc">
            <NavLink
             to={{
                pathname: "/book-details",
                search: "?id=" + _id,
              }}>   
              <h2>{title}</h2>
              </NavLink>
              <h3>{author}</h3>
              <p>{desc}</p>
              
            </div>
           <div>
            <a onClick={handleDelete}><strong>X</strong></a>
           </div>
          </div>
      );
    }
    
    export default BookCard;
    