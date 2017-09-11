import React from 'react';
const activeClass = () => {

    return '';
}
const HeaderNavItem = ({navItem, location}) => {
    return (
        <li className={''}>
            <a href={'#' + navItem.pathname}>
                <i className={'fa ' + navItem.icon} aria-hidden="true"/><span
                className="hidden-xs hidden-sm">{navItem.title}</span>
            </a>
        </li>
    )
}

export  default HeaderNavItem;