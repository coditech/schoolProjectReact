import React from 'react';
import {Route, Switch} from "react-router-dom";
import formurlencoded from 'form-urlencoded';
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import '../../styles/AdminHeader.styl';
import Test from "../../component/Test";

function loadScript(urls) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    })
}
function loadStyle(urls) {
    urls.map(url => new Promise(function (resolve, reject) {
        const link = document.createElement('link');
        link.type = 'text/css';
        link.async = true;
        link.src = url;
        link.onload = resolve;
        link.onerror = reject;

        document.head.appendChild(link);
    }));
}
const AdminArticlePage = ({match}) => ( <h2>Helloo ha {match.params.id}</h2>);


const Dashboard = () => {


    return <h3>Dashboard</h3>
}


function fetchJson(url) {
    return fetch('http://localhost:8000/api/' + url).then(res => res.json())
}
const STATUS = {
    NONE: 0,
    LOADING: 1,
    READY: 2,
    ERROR: 3
};

function fetchPostJson(url, data) {
    const bodyData = formurlencoded(data, {
        ignorenull: true,
        skipIndex: true,
        sorted: true
    })
    const settings = {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: bodyData
    };
    return fetch('http://localhost:8000/api/' + url, settings).then(res => res.json())
}
class AdminPages extends React.Component {

    constructor(props, context) {
        super(props, context);


        const {
            location
            , match
            , signOut
            , auth

        } = props;

        const state = {
            location
            , match
            , signOut
            , auth
            , users: {
                users: [],
                errors: null,
                status: STATUS.NONE
            }
            , usersSearch: {
                users: [],
                errors: null,
                status: STATUS.NONE
            }
            , editUser: {
                id: null,
                errors: null,
                status: STATUS.NONE
            }, addUser: {

                errors: null,
                status: STATUS.NONE
            }, deleteUser: {
                id: null,
                errors: null,
                status: STATUS.NONE
            }
        }
        this.state = state;
        this.bindMe([
            'isUserAdmin',
            'isUserTeacher',
            'isUserStudent',
            'getUsers',
            'getuserById',
            'getUsersSearch',
            'deleteUser',
            'editUser',
            'addUser'
        ])

    }


    bindMe(methodNames) {
        methodNames.map(methodName =>
            this[methodName] = this[methodName].bind(this)
        )
    }

    isUserAdmin() {

        return this.state.auth.userType === 'admin';
    }

    isUserTeacher() {
        return this.state.auth.userType === 'teacher';

    }

    isUserStudent() {
        return this.state.auth.userType === 'student';

    }

    getUsername() {
        return this.state.auth.username;
    }

    getPassword() {
        return this.state.auth.username;
    }

    getUsers() {
        this.setState({...this.state, users: {...this.state.users, status: STATUS.LOADING}});
        const bodyData = {
            api_username: this.getUsername(),
            api_password: this.getPassword()
        };
        fetchPostJson('person/info/search', bodyData).then(res => {
            console.log('Ressouces', res);
            if (!res.success) {
                console.log('Ressouces', res);

                throw new Error(res.error);
                const oldState = this.state;
                const newState = {...oldState, users: {...oldState.users, error: res.error, status: STATUS.ERROR}};
                this.setState(newState);
                return;

            }
            const users = [];
            res.data.map(function (user) {
                users[user.id] = {
                    username: user.username,
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    gender: user.gender,
                    email: user.email,
                    telephone: user.telephone,
                    userType: user.userType,
                    date: user.date
                }

            });
            const usersObject = {
                users: users,
                error: null,
                status: STATUS.READY
            }
            const oldState = this.state;
            const newState = {...oldState, users: usersObject};
            this.setState(newState);


        })

    }

    getuserById({id}) {

        const bodyData = {
            api_username: this.getUsername(),
            api_password: this.getPassword(),
            id
        }
        this.setState({...this.state, users: {...this.state.users, status: STATUS.LOADING}});

        fetchPostJson('person/info/id', bodyData).then(res => {

            if (!res.success) {
                throw new Error(res.error);

                const oldState = this.state;
                const newState = {...oldState, users: {...oldState.users, error: res.error, status: STATUS.ERROR}};
                this.setState(newState);
                return;

            }
            const user = {
                username: res.data.username,
                id: res.data.id,
                name: res.data.name,
                lastName: res.data.lastName,
                gender: res.data.gender,
                email: res.data.email,
                telephone: res.data.telephone,
                userType: res.data.userType,
                date: res.data.date
            }
            const oldState = this.state;
            const newState = {...oldState, users: {...oldState.users, user: {...oldState.users.users, [id]: user}}};
            this.setState(newState);


            return rsponse;
        })
    }

    deleteUser({id}) {
        const bodyData = {
            api_username: this.getUsername(),
            api_password: this.getPassword(),
            id
        }
        this.setState({...this.state, deleteUser: {...this.state.deleteUser, status: STATUS.LOADING, id: id}});

        fetchPostJson('person/delete', bodyData).then(res => {
            console.log('Ressources ==>>', res);
            if (!res.success) {
                throw new Error(res.error);
                const oldState = this.state;
                const newState = {
                    ...oldState,
                    deleteUser: {...oldState.deleteUser, status: STATUS.ERROR, error: res.error}
                };
                this.setState(newState);
                return;

            }


            const oldState = this.state;
            const usersList = oldState.users.users.splice(id, 1);
            const newState = {
                ...oldState,
                users: {...oldState.users, users: usersList},
                deleteUser: {...oldState.deleteUser, status: STATUS.READY, error: null}
            };
            this.setState(newState);

        });


    }

    editUser({id, name, lastName, gender, email, telephone, userType, username, password}) {
        const bodyData = {
            api_username: this.getUsername(),
            api_password: this.getPassword(),
            id,
            name,
            lastName,
            gender,
            email,
            telephone,
            userType,
            username,
            password
        };
        this.setState({...this.state, editUser: {...this.state.editUser, status: STATUS.LOADING, id: id}});

        fetchPostJson('person/edit', bodyData).then(res => {
            if (!res.success) {
                throw new Error(res.error);
                const oldState = this.state;
                const newState = {
                    ...oldState,
                    editUser: {...oldState.editUser, status: STATUS.ERROR, error: res.error}
                };
                this.setState(newState);
                return;

            }

            const user = {
                username: res.data.username,
                id: res.data.id,
                name: res.data.name,
                lastName: res.data.lastName,
                gender: res.data.gender,
                email: res.data.email,
                telephone: res.data.telephone,
                userType: res.data.userType,
                date: res.data.date
            }
            const oldState = this.state;
            const newState = {
                ...oldState,
                users: {...oldState.users, status: STATUS.READY, users: {...oldState.users.users, [id]: user}}
                , editUser: {...oldState.editUser, status: STATUS.READY, error: null}
            };
            this.setState(newState);

        })
    }

    addUser({name, lastName, gender, email, telephone, userType, username, password}) {
        const bodyData = {
            api_username: this.getUsername(),
            api_password: this.getPassword(),
            name,
            lastName,
            gender,
            email,
            telephone,
            userType,
            username,
            password
        };
        this.setState({...this.state, addUser: {...this.state.addUser, status: STATUS.LOADING}});

        fetchPostJson('person/edit', bodyData).then(res => {
            if (!res.success) {
                throw new Error(res.error);
                const oldState = this.state;
                const newState = {
                    ...oldState,
                    addUser: {...oldState.addUser, status: STATUS.ERROR, error: res.error}
                };
                this.setState(newState);
                return;

            }


            const oldState = this.state;
            const newState = {
                ...oldState,
                users: {...oldState.users, status: STATUS.READY, users: {...oldState.users.users, [id]: user}, }
                , addUser: {...oldState.addUser, status: STATUS.READY}
            };
            this.setState(newState);
        });
    }

    getUsersSearch({id, name, lastName, gender, email, telephone, userType, username}) {
        this.setState({...this.state, usersSearch: {...this.state.usersSearch, status: STATUS.LOADING}});

        const bodyData = {
            api_username: this.getUsername(),
            api_password: this.getPassword(),
            id,
            name,
            lastName,
            gender,
            email,
            telephone,
            userType,
            username
        }
        const response = {
            success: true,
            error: null
        }
        fetchPostJson('person/info/search', bodyData).then(res => {
            if (!res.success) {
                throw new Error(res.error);
                const oldState = this.state;
                const newState = {
                    ...oldState,
                    usersSearch: {...oldState.usersSearch, status: STATUS.ERROR, error: res.error}
                };
                this.setState(newState);

                return;

            }
            const usersSearch = [];
            res.data.map(function (user) {
                users[user.id] = {
                    username: user.username,
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    gender: user.gender,
                    email: user.email,
                    telephone: user.telephone,
                    userType: user.userType,
                    date: user.date
                }

            });
            const oldState = this.state;
            const newState = {...oldState, usersSearch: {...oldState.usersSearch, status: STATUS.READY, users: usersSearch}};
            this.setState(newState);

        });

    }


    render() {
        /*    const passed_props = {
         location: this.state.location,
         match: this.state.match,
         signOut: this.state.signOut
         }*/
        const {
            getUsers,
            getuserById,
            deleteUser
        } = this;
        const passed_props = {
            location: this.state.signOut,
            match: this.state.match,
            signOut: this.state.signOut,
            auth: this.state.auth,
            getUsers,
            getuserById,
            deleteUser
        };

        return (
            <main>
                <Test {...passed_props} />

                <HeaderAdmin {...passed_props}>
                    <Switch>
                        <Route path='/admin/:id' render={(props) => <AdminArticlePage {...props}/>}/>
                        <Route path='/admin' render={(props) => <Dashboard {...props}/>}/>


                    </Switch>
                </HeaderAdmin>
            </main>

        )
    }
}
export  default AdminPages;