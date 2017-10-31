import React from "react";
import {Redirect} from "react-router-dom";

const Login = ({checkAuthenticate, location, authenticate, login}) => {


    const {from} = location.state || {from: {pathname: '/admin'}}

    if (checkAuthenticate()) {
        return (
            <Redirect to={'/admin'}/>
        )
    }
    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <input type="text" name="username" id="username" placeholder="Username"/>
            <input type="password" name="password" id="password" placeholder="Password"/>
            <button onClick={() => {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                login(username, password);
            }
            }>Log in
            </button>
        </div>
    )
}

export default Login;