import React from 'react'
import { Link } from 'react-router-dom';
import './NavLink.css';

const NavLink = ( {to, children, variant = 'default', className = ''}) => {
    return (
        <Link to={to} className={`navlink ${variant} ${className}`}>
            {children}
        </Link>
    )
}
export default NavLink;