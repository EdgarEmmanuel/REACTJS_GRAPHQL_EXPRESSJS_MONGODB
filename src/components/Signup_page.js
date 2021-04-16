import React from 'react';
import { useState } from 'react';
import '../css/signup_page.css';
import User from '../http/serviceUser';
import { Redirect } from 'react-router-dom';

function SignupPage(){
    const [login,setLogin] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage]=useState("");
    const [redirect,setRedirect]= useState(false);

    function onPasswordChange(e){
        e.preventDefault();
        setPassword(e.target.value);
    }

    function onLoginChange(e){
        e.preventDefault();
        setLogin(e.target.value);
    }

    function clearField(){
        setPassword("");
        setLogin("");
    }

    async function submitData(e){
        e.preventDefault();
        

        if(login==="" || password===""){
            setMessage("LES CHAMPS DOIVENT ETRE REMPLIS");
        }else{
            let user = new User(login,password);
            await user.SignUpUser().then(
                (data)=>{
                    console.log(data);

                    //clear field 
                    clearField();


                    //redirecttion by changin the state of the redirect
                    setRedirect(true);

                    
                }
            ).catch(err=>{
                console.log(err);
            })
        }
    }

    return (
        <div className="Signup_page">
            { redirect ? (<Redirect push to="/"/>) : null }
             <form onSubmit={submitData} method="post">
                <h1>SIGN UP</h1>
                <p>{message}</p>
                <label>Login</label><br/>
                <input type="email" name="login" onChange={onLoginChange} /><br/>
                <label>Password</label><br/>
                <input type="password" name="Password" onChange={onPasswordChange} /><br/><br/>
                <input type="submit" value="SignUp" />
                <a href="/">Go to Login Page</a>
            </form>
        </div>
    )
}

export default SignupPage;