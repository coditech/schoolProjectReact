import  React from "react";
import {Redirect} from "react-router-dom";

const Login = ({checkAuthenticate, location, authenticate, login}) => {


    const {from} = location.state || {from: {pathname: '/admin' }}

    if (checkAuthenticate()) {
        return (
            <Redirect to={from}/>
        )
    }
    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <input type="text" name="username" id="username" placeholder="Username"/>
            <input type="text" name="password" id="password" placeholder="Password"/>
            <button onClick={() => {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                login(username, password);
            }
            }>Log in
            </button>
            <button onClick={() => {
                login('admin', 'admin');
            }
            }>Log in 2
            </button>
        </div>
    )
}

export default Login;