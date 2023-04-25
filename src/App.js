import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddBook from './components/AddBook';
import FrontPage_BookList from './components/FrontPage_BookList';


function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
      <Routes>
        <Route path="/create-book"  element={<AddBook />} />
        <Route path="/"  element={<AddBook />} />
        <Route path="/book-list"  element={<FrontPage_BookList />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

