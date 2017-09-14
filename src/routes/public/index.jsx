import React, {Component} from  'react';
import {Link, Route, Switch} from "react-router-dom";
import ArticlePage from "./ArticlePage";
import HomePage from "./HomePage";
import PageNotFound from "./404";
import NavBar from "../../component/NavBar/index";
import Header from "../../component/Header";

const mixProps = (passed_props_home) => (props) => ({...passed_props_home, ...props})

class PublicPages extends Component {

    constructor(props, ctx) {
        super(props, ctx);


        this.state = {
            loadArticles: props.loadArticles
            , articlesList: props.articlesList
            , onClick: props.onClick
            , loadArticle: props.loadArticle
            , articleList: props.articleList
            , location: props.location
            , match: props.match
            , auth: props.auth
            , signOut: props.signOut
            , props: props

        }

    }


    componentDidMount() {
        console.log('componentDidMount => public', this.state);

        const match = this.state.match;
        if (this.state.location.pathname === '/' || this.state.location.pathname === '/article') {
            this.state.loadArticles(1);

        }

        if (match.params.page === 'article') {
            if (match.params.page2) {
                this.state.loadArticle(match.params.page2);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const match = this.state.match;

        console.log('componentWillReceiveProps => public', nextProps);
        if (nextProps.location.pathname !== '/' && this.state.location.pathname !== nextProps.location.pathname) {
            nextProps.articlesList.currentPage = 1;
        }
        if (nextProps.articlesList.currentPage <= 1 && nextProps.location.pathname === '/' && !this.state.articlesList.status) {
            // nextProps.loadArticles(1);
        }
        if (this.state.location.pathname === '/' || this.state.location.pathname === '/article') {
            if (!nextProps.articlesList.status) {
                this.state.loadArticles(1);
            }

        }


        if (nextProps.location.pathname === '/') {
            if (this.state.articlesList.currentPage !== nextProps.articlesList.currentPage) {

                this.setState(nextProps);

            } else if (nextProps.articlesList.currentPage === -1) {
                // nextProps.articlesList.currentPage = 1;
                // nextProps.loadArticles(1);
            }


        } else {

            this.setState(nextProps);

        }

        //
        // if (this.props.articlesList.currentPage !== nextProps.articlesList.currentPage) {
        //     this.state.loadArticles(nextProps.articlesList.currentPage)
        // }
    }

    render() {
        const {
            loadArticles
            , articlesList
            , onClick
            , loadArticle
            , articleList
            , signOut
            , auth
            , location


        } = this.state;


        const passed_props_home = {
            signOut
            , auth
            , loadArticles
            , articlesList
            , onClick
            , loadArticle
            , articleList
            , location
        }
        const mix = mixProps(passed_props_home);

        return (
            <div>
                <NavBar {...{auth, signOut}}/>
                <Header/>

                <Switch>
                    <Route path='/article/:id' render={(props) => {

                        return ( <ArticlePage {...mix(props)}/>)
                    }
                    }/>
                    <Route exact path='/article' render={(props) => {

                        return <HomePage {...mix(props)}/>
                    }
                    }/>
                    <Route exact path='/' render={(props) => <HomePage {...mix(props)}/>}/>
                    <Route path='/' render={(props) => <PageNotFound {...mix(props)}/>}/>
                </Switch>

            </div>
        )
    }
}
export default PublicPages;