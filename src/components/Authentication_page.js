import React from 'react';
import { useState } from 'react';
import '../css/auth_page.css';
import { Redirect } from 'react-router-dom';
import User from '../http/serviceUser';

function AuthenticationPage(){
    const [login,setLogin] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");
    const [redirect,setRedirect] = useState(false);

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
            await user.loginUser().then(
                (data)=>{
                    //get the response data
                    let all_data = data.data.data;
                    user.setDetailsToken(all_data)

                    //clear field
                    clearField();

                    //redirection by changing the state of the redirect
                    setRedirect(true);
                }
            ).catch(err=>{
                console.log(err);
                setMessage("THE USER  DOESN'T EXISTS ");
            })
        }        
    }

    
    return (
        <div className="auth_page">
            {redirect ? (<Redirect to="/home"/>) : null}
            <form onSubmit={submitData} method="post">
                <h1>SIGN IN</h1>
                <p>{message}</p>
                <label>Login</label><br/>
                <input type="email" onChange={onLoginChange} name="login" placeholder="login"/><br/>
                <label>Password</label><br/>
                <input type="password" onChange={onPasswordChange} name="Password" placeholder="password" /><br/><br/>
                <input type="submit" value="SignIn" />
                <a href="/signup">Go to SignUp</a>
            </form>
           
        </div>
    )
}

export default AuthenticationPage;