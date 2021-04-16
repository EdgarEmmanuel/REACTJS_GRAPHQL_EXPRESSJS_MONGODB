import React from 'react';
import '../css/books_page.css';
import Navbar from './Navbar';

function BooksPage(){
    return (
        <div className="books_page">
            <Navbar/>
            <h1>Books Page</h1>
        </div>
    )
}

export default BooksPage;