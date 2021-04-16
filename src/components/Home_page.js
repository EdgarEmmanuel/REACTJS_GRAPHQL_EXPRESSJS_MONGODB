import React from 'react';
import '../css/home_page.css';
import Navbar from './Navbar';

function HomePage(){
    return (
        <div className="home_page">
            <Navbar/>
            <h1>WELCOME HOME</h1>
        </div>
    )
}

export default HomePage;