import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Router from '../routes/index'
import Test from './Test';
import '../styles/App.styl';
import {Link, Redirect, Route, withRouter} from "react-router-dom";

const STATUS = {
    NONE: 0,
    LOADING: 1,
    READY: 2,
    ERROR: 3
};

function fetchJson(url) {
    return fetch('http://localhost:8000/api/' + url).then(res => res.json())
}
function fetchPostJson(url, settings) {
    return fetch('http://localhost:8000/api/' + url, settings).then(res => res.json())
}
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class App extends Component {
    constructor(props, context) {
        super(props, context);

        const state = {
            articlesList: {
                pages: [
                    {
                        pagination: []
                    }
                ],
                currentPage: -1,
                status: STATUS.NONE
            },
            articleList: {
                article: [],
                currentArticle: -1,
                status: STATUS.NONE
            },
            students: {
                items: [],
                loaded: STATUS.NONE
            },
            currentPage: 'home',
            auth: {
                username: '',
                password: '',
                id: '',
                status: STATUS.NONE,
                userType: null,
                isAuthenticated: false,
                authenticate(cb) {
                    this.isAuthenticated = true;
                    setTimeout(cb, 100) // fake async
                },
                signout(cb) {

                    this.isAuthenticated = false;
                    setTimeout(cb, 100)
                }

            },
            redirectToReferrer: false
        };
        this.bindMe([
            'loadArticles', 'loadArticle', 'onClick', 'PrivateRoute', 'AuthButton', 'authenticate', 'checkAuthenticate'
            , 'login', 'signOut'
        ]);
        this.state = state;

    }

    bindMe(methodNames) {
        methodNames.map(methodName =>
            this[methodName] = this[methodName].bind(this)
        )
    }


    onClick(event) {
        event.preventDefault();
        this.props.dispatch(push(this.props.path));
    }

    loadArticles(page = 1) {
        this.setState({...this.state, articlesList: {...this.state.articlesList, status: STATUS.LOADING}});
        if (this.state.articlesList.pages[page]) {
            if (page != this.state.articlesList.currentPage) {
                const oldState = this.state;
                const articlesList = oldState.articlesList;
                const newState = {...oldState, articlesList: {...articlesList, currentPage: page}}
                this.setState(newState);

            }

        } else {
            fetchJson('home?limit=10&&page=' + page)
                .then(
                    res => {
                        if (!res.success) {
                            throw new Error(res.error);
                        }


                        const pagination = [...res.previous, page, ...res.next];
                        const page_item = {
                            articlesList: res.data,
                            pagination
                        }
                        const pages = {...this.state.articlesList.pages, [page]: page_item};

                        const articlesList = {
                            pages,
                            currentPage: page,
                            lastPage: res.last,
                            status: STATUS.READY,
                        };

                        const oldState = this.state;
                        const newState = {...oldState, articlesList}
                        this.setState(newState);
                    }
                )
        }
    }

    loadArticle(id) {
        if (id) {

            this.setState({...this.state, articleList: {...this.state.articleList, status: STATUS.LOADING}});
            if (this.state.articleList.article[id]) {
                if (id != this.state.articlesList.currentArticle) {
                    const oldState = this.state;
                    const articlesList = oldState.articlesList;
                    const newState = {...oldState, articlesList: {...articlesList, currentPage: id}}
                    this.setState(newState);

                }

            } else {
                try {
                    fetchJson('articles?id=' + id)
                        .then(
                            res => {
                                if (!res.success) {

                                    throw new Error(res.error);
                                    return;
                                }
                                else {


                                    let article = {
                                        article: {
                                            id: res.data.id,
                                            title: res.data.title,
                                            content: res.data.text,
                                            featuredimage: res.data.featuredimage,
                                            date: res.data.date
                                        }
                                    }
                                    if (!isEmpty(res.previous)) {

                                        const previousArticle = {
                                            id: res.previous.id,
                                            title: res.previous.title,
                                            content: res.previous.text,
                                            featuredimage: res.previous.featuredimage,
                                            date: res.previous.date
                                        };


                                        article = {...article, previousArticle}
                                    }
                                    if (!isEmpty(res.next)) {

                                        const nextArticle = {
                                            id: res.next.id,
                                            title: res.next.title,
                                            content: res.next.text,
                                            featuredimage: res.next.featuredimage,
                                            date: res.next.date
                                        };
                                        article = {...article, nextArticle}


                                    }


                                    const articleList = {
                                        article: {...this.state.articleList.article, [id]: article},
                                        currentArticle: id,
                                        status: STATUS.READY
                                    }

                                    const oldState = this.state;
                                    const newState = {...oldState, articleList}
                                    this.setState(newState);


                                }
                            }
                        )

                } catch (e) {
                    console.log(e.message);
                }
            }
        }
    }


    /**
     * Admin Section
     * */
    authenticate() {
        this.state.auth.authenticate(() => (this.setState({...this.state, redirectToReferrer: true})))
    };

    checkAuthenticate() {

        return this.state.auth.isAuthenticated;
    }

    login(username, password) {
        this.setState({...this.state, auth: {...this.state.auth, status: STATUS.LOADING}});

        const bodyData = 'username=' + username + '&password=' + password;
        const settings = {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: bodyData
        };
        fetchPostJson('person/login', settings).then(res => {

            if (!res.success) {

                throw new Error(res.error);
                return;
            }

            const auth = {
                username: res.user.username,
                isAuthenticated: true,
                id: res.user.id,
                password: password,
                status: STATUS.READY,
                userType: res.user.userType
            }

            const oldState = this.state;
            const newState = {...oldState, auth: {...oldState.auth, ...auth}}


            this.state.auth.authenticate(this.setState(newState));
            // this.authenticate();

        })
            .catch(function (error) {
                console.log('Request failed', error);
            });


    }

    signOut() {

        this.setState({...this.state, auth: {...this.state.auth, status: STATUS.LOADING}});
        fetchJson('person/logout').then(res => {
            console.log("response Signout =+=>", res)
        });
        const auth = {
            username: null,
            isAuthenticated: false,
            id: null,
            password: null,
            userType: null,
            status: STATUS.NONE,
        }
        const oldState = this.state;
        const newState = {...oldState, auth: {...oldState.auth, ...auth}};
        this.state.auth.signout(() => this.setState(newState));


    }

    PrivateRoute = ({component: Component, passedProps, ...rest}) => {

        return (
            <Route {...rest} render={props => {
                const {auth} = passedProps;
                props = {...props, ...passedProps};
                return (
                    auth.isAuthenticated ? (
                        <Component {...props}/>
                    ) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: {from: props.location}
                        }}/>
                    )
                )
            }}/>
        )
    };

    AuthButton = withRouter(({history}) => (
        this.state.auth.isAuthenticated ? (
            <p>
                Welcome!
                <button onClick={() => {
                    this.state.auth.signout(() => history.push('/'))
                }}>Sign out
                </button>
            </p>
        ) : (
            <p>You are not logged in. <Link to={'login'}>Login</Link></p>
        )
    ))


    componentWillMount() {

        // this.loadArticles(1);
    }

    render() {
        const {
            articlesList,
            articleList,
            auth
        } = this.state;
        const {
            loadArticles
            , loadArticle
            , onClick
            , PrivateRoute
            , authenticate
            , AuthButton
            , checkAuthenticate
            , login
            , signOut
        } = this;

        const passedProps = {
            loadArticles
            , articlesList
            , articleList
            , onClick
            , loadArticle
            , auth
            , PrivateRoute
            , authenticate
            , AuthButton
            , checkAuthenticate
            , login
            , signOut
        };

        return (
            <div className="div">
                <Router {...passedProps} />
            </div>
        )
    }
}


export default App;
