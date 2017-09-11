import React, {Component} from  'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link, NavLink, withRouter} from "react-router-dom";


import '../../styles/NavBar.styl';
import {LinkContainer} from "react-router-bootstrap";

const SignedIn = () => {

    return (
        <LinkContainer to={'/admin'}>
            <NavItem role="">Admin</NavItem>
        </LinkContainer>
    )
}

const NavBar = ({auth,signOut}) => {
    const AuthLink = withRouter(({history}) => (
        auth.isAuthenticated ? (
            <LinkContainer to={'/'} onClick={(e) => {
                e.preventDefault();
                signOut();

            }}>
                <NavItem >Sign out</NavItem>
            </LinkContainer>
        ) : (
            <LinkContainer to={'login'}>
                <NavItem>Login</NavItem>
            </LinkContainer>
        )
    ))

    return (
        <Navbar className="navbar-school" collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand className="navbar-link">
                    <a href="#/2">SCC School</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>

                    <LinkContainer to={'/'}>
                        <NavItem role="">Home</NavItem>
                    </LinkContainer>
                    <LinkContainer to={'article'}>
                        <NavItem >Article</NavItem>
                    </LinkContainer>
                    {/*<li key={0} role="presentation" className={'active'}>*/}
                    {/*<Link to='/'>Home</Link>*/}
                    {/*</li>*/}
                    {/*<li key={1} role="presentation">*/}
                    {/*<Link to='/article'>Article</Link>*/}
                    {/*</li>*/}

                </Nav>
                <Nav pullRight>
                    {
                        auth.isAuthenticated ? <SignedIn/> : null
                    }
                    <AuthLink/>



                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default NavBar;