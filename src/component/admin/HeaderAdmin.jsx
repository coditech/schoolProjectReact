import React from 'react';
import HeaderNavItem from "./HeaderNavItem";


const toogleClass = (className) => {

    const el = document.getElementById('navigation');
    if (el.classList) {
        el.classList.toggle(className);
    } else {
        const classes = el.className.split(' ');
        const existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
        else
            classes.push(className);

        el.className = classes.join(' ');
    }
}

const AdminNavItem = ({navBarItem}) => (

    <h2>jj</h2>
)
const HeaderAdmin = ({children, location, signOut,navBarItems, auth}) => {

    return (
        <div className="container-fluid display-table">
            <div className="row display-table-row">
                <div className="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">
                    <div className="navi">
                        <ul>

                            {
                                typeof navBarItems !== 'undefined' ? navBarItems.map((navItem,index) => (
                                    <HeaderNavItem key={index} {...{navItem}}/>
                                )) : null
                            }


                            <li>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    signOut()
                                }}>
                                    <i className="fa fa-cog" aria-hidden="true"/>
                                    <span className="hidden-xs hidden-sm">Sign Out</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-10 col-sm-11 display-table-cell v-align">
                    <div className="row">
                        <header>
                            <div className="col-md-7">
                                <nav className="navbar-default pull-left">
                                    <div className="navbar-header">
                                        <button type="button" className="navbar-toggle collapsed" onClick={(event) => {
                                            toogleClass('hidden-xs')
                                        }}
                                                data-toggle="offcanvas"
                                                data-target="#side-menu" aria-expanded="false">
                                            <span className="sr-only">Toggle navigation</span>
                                            <span className="icon-bar"/>
                                            <span className="icon-bar"/>
                                            <span className="icon-bar"/>
                                        </button>
                                    </div>
                                </nav>

                            </div>
                            <div className="col-md-5">
                                <div className="header-rightside">

                                </div>
                            </div>
                        </header>
                    </div>
                    <div className="user-dashboard">
                        {children}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HeaderAdmin;