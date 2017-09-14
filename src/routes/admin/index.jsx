import React from 'react';
import {Route, Switch} from "react-router-dom";
import formurlencoded from 'form-urlencoded';
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import '../../styles/AdminHeader.styl';
import Test from "../../component/Test";
import UsersPage from "./UsersPage";
import UserEditPage from "./UserEditPage";
import UsersAddPage from "./UsersAddPage";
import PageNotFound from "../public/404";

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
const mixProps = (passed_props_home) => (props) => ({...passed_props_home, ...props})

const AdminArticlePage = ({match}) => ( <h2>Helloo ha {match.params.id}</h2>);


const Dashboard = () => {
    return <h3>Dashboards</h3>
};
const STATUS = {
    NONE: 0,
    LOADING: 1,
    READY: 2,
    ERROR: 3,
    CHANGED: 4,
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

const navBarItems = [
    {
        title: 'Home',
        pathname: '/',
        icon: 'fa-home',
    }
    , {
        title: 'Users',
        pathname: '/admin/users',
        icon: 'fa-users'
    }, {
        title: 'Dashboard',
        pathname: '/admin',
        icon: 'fa-dashboard'
    }

]
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
            , current_page: '/admin'
            , users: {
                users: [],
                errors: null,
                status: STATUS.NONE
            }
            , usersSearchData: {
                users: [],
                errors: null,
                status: STATUS.NONE
            }
            , editUserData: {
                id: null,
                errors: null,
                user: null,
                status: STATUS.NONE
            }, addUserData: {
                user: {},
                errors: null,
                status: STATUS.NONE
            }, deleteUserData: {
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
            'getUsersSearch',
            'deleteUser',
            'editUser',
            'addUser',
            'getEdituserById',
            'handleEditInputChange',
            'handleUserAddInputChange'
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

    clearData() {
        const oldState = this.state;
        const initialData = {
            users: {
                users: [],
                errors: null,
                status: STATUS.NONE
            }
            , usersSearchData: {
                users: [],
                errors: null,
                status: STATUS.NONE
            }
            , editUserData: {
                id: null,
                errors: null,
                user: null,
                status: STATUS.NONE
            }, addUserData: {
                user: {},
                errors: null,
                status: STATUS.NONE
            }, deleteUserData: {
                id: null,
                errors: null,
                status: STATUS.NONE
            },
            auth: {}
        }

        const newState = {...oldState, ...initialData}
        this.setState(newState);
    }

    getUsers() {
        this.setState({...this.state, users: {...this.state.users, status: STATUS.LOADING}});
        const bodyData = {
            api_username: this.getUsername(),
            api_password: this.getPassword()
        };

        fetchPostJson('person/info/search', bodyData).then(res => {
            console.log('ress', res)
            if (!res.success) {
                throw new Error(res.error);
                if (res.error === 'Incorrect Username Or Password') {
                    this.clearData();

                } else {
                    const oldState = this.state;
                    const newState = {...oldState, users: {...oldState.users, error: res.error, status: STATUS.ERROR}};
                    this.setState(newState);
                    return;
                }
            }
            const users = [];
            res.data.map(function (user) {
                users.push({
                    username: user.username,
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    gender: user.gender,
                    email: user.email,
                    telephone: user.telephone,
                    userType: user.userType,
                    date: user.date,
                    password: user.password
                })
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

    getEdituserById({id}) {
        const bodyData = {
            api_username: this.getUsername(),
            api_password: this.getPassword(),
            id: id
        }

        const oldState = this.state;
        this.setState({
            ...oldState,
            editUserData: {...oldState.editUserData, status: STATUS.LOADING}
        });

        if (this.state.users.users[id]) {

            const user = this.state.users.users[id];
            const newState = {...oldState, editUserData: {...oldState.editUserData, user: user, status: STATUS.READY}}
            this.setState(newState);
        }
        fetchPostJson('person/info/id', bodyData).then(res => {
            if (!res.success) {
                throw new Error(res.error);
                if (res.error === 'Incorrect Username Or Password') {
                    this.clearData();

                } else {
                    const newState = {
                        ...oldState
                        , editUserData: {...oldState.editUserData, status: STATUS.ERROR, user: {}}
                    };
                    this.setState(newState);
                    return;
                }
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
                date: res.data.date,
                password: res.data.password
            }
            const oldState = this.state;
            const newState = {
                ...oldState,
                editUserData: {...oldState.editUserData, status: STATUS.READY, id: user.id, user}
            };
            this.setState(newState);
        })
    }

    handleEditInputChange(input) {
        const oldState = this.state;
        const user = oldState.editUserData.user;
        user[input.key] = input.value;
        const newState = {...oldState, editUserData: {...oldState.editUserData, user}}
        this.setState(newState);

    }

    handleUserAddInputChange(input) {
        const oldState = this.state;
        const user = oldState.addUserData.user;
        user[input.key] = input.value;
        const newState = {...oldState, addUserData: {...oldState.addUserData, user}}
        this.setState(newState);

    }

    deleteUser(id) {
        const bodyData = {
            api_username: this.getUsername(),
            api_password: this.getPassword(),
            id: id
        }
        this.setState({...this.state, deleteUser: {...this.state.deleteUser, status: STATUS.LOADING, id: id}});
        fetchPostJson('person/delete', bodyData).then(res => {
            if (!res.success) {
                throw new Error(res.error);
                if (res.error === 'Incorrect Username Or Password') {
                    this.clearData();

                } else {
                    const oldState = this.state;
                    const newState = {
                        ...oldState,
                        deleteUser: {...oldState.deleteUser, status: STATUS.ERROR, error: res.error}
                    };
                    this.setState(newState);
                    return;
                }
            }
            const oldState = this.state;
            const usersList = oldState.users.users;
            const user = usersList.filter((user) => {
                return user.id === id
            })[0];
            let keys = Object.keys(user);
            // remove element from the array by index
            usersList.splice(
                // get the index of the element
                usersList.findIndex(function (obj) {
                    // check all property values are equal
                    return keys.every(function (k) {
                        return obj.id === user.id;
                    });
                    // if you want to check only the `id` property then     // you can avoid the above codes and use
                    // return obj.id === task.id;
                }), 1);
            const newState = {
                ...oldState,
                users: {...oldState.users, users: usersList},
                deleteUser: {...oldState.deleteUser, status: STATUS.READY, error: null}
            };
            this.setState(newState);
        });
        this.getUsers();
    }

    editUser() {
        const bodyData = {
            api_username: this.getUsername(),
            api_password: this.getPassword(),
            ...this.state.editUserData.user
        };
        this.setState({...this.state, editUserData: {...this.state.editUserData, status: STATUS.LOADING}});
        fetchPostJson('person/edit', bodyData).then(res => {
            const oldState = this.state;

            if (!res.success) {
                throw new Error(res.error);
                if (res.error === 'Incorrect Username Or Password') {
                    this.clearData();

                } else {
                    const newState = {
                        ...oldState,
                        editUserData: {...oldState.editUserData, status: STATUS.ERROR, error: res.error}
                    };
                    this.setState(newState);
                    return;
                }

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
                date: res.data.date,
                password: res.data.password
            }
            const newState = {
                ...oldState
                , editUserData: {...oldState.editUserData, status: STATUS.READY, error: null}
            };
            this.setState(newState);
        })


    }

    addUser() {
        const user = this.state.addUserData.user;
        console.log('add user', user);
        const bodyData = {
            api_username: this.getUsername(),
            api_password: this.getPassword(),
            ...user
        };
        this.setState({...this.state, addUserData: {...this.state.addUserData, status: STATUS.LOADING}});

        fetchPostJson('person/add', bodyData).then(res => {
            if (!res.success) {
                throw new Error(res.error);
                if (res.error === 'Incorrect Username Or Password') {
                    this.clearData();

                } else {
                    const oldState = this.state;
                    const newState = {
                        ...oldState,
                        addUserData: {...oldState.addUserData, status: STATUS.ERROR, error: res.error}
                    };
                    this.setState(newState);
                    return;

                }
            }


            const oldState = this.state;
            const id = oldState.addUserData.user.id;
            const newState = {
                ...oldState,
                users: {...oldState.users, status: STATUS.READY, users: {...oldState.users.users, [id]: user},}
                , addUserData: {...oldState.addUserData, status: STATUS.READY}
            };
            this.setState(newState);
        }).catch(e => {
            throw new Error(e);
            const oldState = this.state;
            const newState = {
                ...oldState,
                addUserData: {...oldState.addUserData, status: STATUS.ERROR, error: e.message}
            };
            this.setState(newState);
            return;
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
                if (res.error === 'Incorrect Username Or Password') {
                    this.clearData();

                } else {
                    const oldState = this.state;
                    const newState = {
                        ...oldState,
                        usersSearch: {...oldState.usersSearch, status: STATUS.ERROR, error: res.error}
                    };
                    this.setState(newState);

                    return;
                }

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
            const newState = {
                ...oldState,
                usersSearch: {...oldState.usersSearch, status: STATUS.READY, users: usersSearch}
            };
            this.setState(newState);

        });

    }


    componentDidMount() {
        const match = this.state.match;
        const {page, page2, page3} = this.state.match.params;
        if (page) {
            if (page === 'users') {

                if (page2) {
                    if (page2 === 'edit') {
                        if (page3) {
                            const id = page3;
                            this.getEdituserById({id});

                        }


                    }
                } else {
                    this.getUsers();
                }
            }
        }

    }

    componentWillReceiveProps(nextProps) {
        const {page, page2, page3} = nextProps.match.params;
        if (page) {
            if (page === 'users') {
                if (page2) {
                    if (page2 === 'edit') {
                        if (page3) {
                            const id = page3;
                            this.getEdituserById({id});
                        }
                    }
                } else {
                    console.log('22')
                    this.getUsers();
                }
            }
        } else {
        }
        this.setState(nextProps);
    }

    render() {
        /*    const passed_props = {
         location: this.state.location,
         match: this.state.match,
         signOut: this.state.signOut
         }*/
        const {users, editUserData, addUserData} = this.state;
        const {
            getUsers,
            getuserById,
            deleteUser,
            editUser,
            handleEditInputChange,
            handleUserAddInputChange,
            addUser
        } = this;
        const passed_props = {
            location: this.state.signOut,
            match: this.state.match,
            signOut: this.state.signOut,
            auth: this.state.auth,
            getUsers,
            getuserById,
            deleteUser,
            users,
            navBarItems,
            editUser,
            editUserData,
            handleEditInputChange,
            addUserData,
            handleUserAddInputChange,
            addUser
        };
        const mix = mixProps(passed_props);
        return (
            <main>
                <Test {...passed_props} />
                <HeaderAdmin {...passed_props}>
                    <Switch>
                        <Route path='/admin/users/edit/:id' render={(props) => {
                            return <UserEditPage {...mix(props)}/>
                        }}/>
                        <Route exact path='/admin/users/add' render={(props) => {
                            return <UsersAddPage {...mix(props)}/>
                        }}/>
                        <Route exact path='/admin/users' render={(props) => {
                            return <UsersPage {...mix(props)}/>
                        }}/>

                        <Route exact path='/admin' render={(props) => <Dashboard {...mix(props)}/>}/>
                        <Route path='/admin/:i?' render={(props) => <PageNotFound {...mix(props)}/>}/>
                    </Switch>
                </HeaderAdmin>
            </main>
        )
    }
}
export  default AdminPages;