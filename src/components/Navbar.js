import React, { useState } from 'react';
import '../css/navbar.css';
import logo from '../assets/unnamed.gif' ;
import BuildIcon from '@material-ui/icons/Build';
import User from '../http/serviceUser';
import { Redirect } from 'react-router-dom';


function Navbar(){
    const [redirect,setRedirect] = useState(false);
    
    
    function logout(){
        //logout
        const user = new User();
        user.logOut();

        setRedirect(true);
    }
    return (
        <div className="navbar">
            { redirect ? (<Redirect push to="/"/>) : null }
            <header>
                <div className="brand">
                    <img src={logo} alt=""/>
                </div>
                <div className="title">
                    <h2><BuildIcon/> GRAPHQL + REACTJS + JWT <BuildIcon/> </h2>
                </div>
                <div className="menu">
                    <a href="/home">Home</a>
                    <a href="/books">Books</a>
                    <a href="/events">Events</a>
                    <a href="/" onClick={logout}>logout</a>
                </div>
            </header>
        </div>
    )
}

export default Navbar;