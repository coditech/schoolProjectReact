import React, {Component} from  'react';

import HeaderImage from '../assets/img/desk.jpg';
import '../styles/Header.styl';
const Header = () => {


    return (
            <div className="header"
                 style={{
                     backgroundImage: "url('" + HeaderImage + "')",
                     backgroundPosition: 'right', minHeight: '300px',
                     backgroundSize: 'cover'
                 }}>
                <h2 style={{color: 'white', }} className="header-h2">Hello world</h2>

            </div>
    )
};

export default Header;