import React, {Component} from  'react';
import {Link, Route, Switch} from "react-router-dom";
import ArticlePage from "./ArticlePage";
import HomePage from "./HomePage";
import PageNotFound from "./404";
import NavBar from "../../component/NavBar/index";
import Header from "../../component/Header";

const mixProps = (passed_props_home) => (props) => ({...passed_props_home, ...props})

const PublicPages = ({loadArticles, articlesList, articleList, onClick, loadArticle, auth,signOut}) => {




    const passed_props_home = {
        loadArticles, articlesList, onClick, loadArticle, articleList
    }



    const mix = mixProps(passed_props_home);
    return (
        <div>
            <NavBar {...{auth,signOut}}/>
            <Header/>

            <Switch>
                <Route path='/article/:id' render={(props) => {
                    return ( <ArticlePage {...mix(props)}/>)
                }
                }/>
                <Route exact path='/article' render={(props) => <HomePage {...mix(props)}/>}/>
                <Route exact path='/' render={(props) => <HomePage {...mix(props)}/>}/>
                <Route path='/' render={(props) => <PageNotFound {...mix(props)}/>}/>
            </Switch>

        </div>
    )

}
export default PublicPages;