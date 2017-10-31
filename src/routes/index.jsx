import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {
    BrowserRouter, HashRouter,
    Switch,
    Route,
    Link, Redirect, withRouter
} from 'react-router-dom';


import PublicPages from "./public/index";
import AdminPages from "./admin/index";
import Login from "./admin/Login";


const mixProps = (passed_props_home) => (props) => ({...passed_props_home, ...props})

const Router = ({...props, loadArticles, loadArticle, articlesList, articleList, onClick, checkAuthenticate, login, authenticate, PrivateRoute, auth, signOut}) => {

    const passed_props_home = {
        loadArticles
        , articlesList
        , articleList
        , onClick
        , loadArticle
        , checkAuthenticate
        , authenticate
        , login
        , auth
        , signOut
    };
    const mix = mixProps(passed_props_home);
    return (
        <main>
            <Switch>

                <PrivateRoute path="/admin/:page?/:page2?/:page3?/:page4?" component={AdminPages} passedProps={passed_props_home}/>

                <Route path='/login' render={(props) => <Login {...mix(props)}/>}/>
                <Route path='/:page?/:page2?/:page3?/:page4?' render={(props) => {
                    return ( <PublicPages {...mix(props)}/>)
                }
                }/>
            </Switch>
        </main>
    )
}


export default Router;
