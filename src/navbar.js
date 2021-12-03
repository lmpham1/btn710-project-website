import React from "react";
import { NavLink, withRouter, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    let activeStyle = {
        backgroundColor: "#373c45"
    }
    return (
        <ul className="nav-ul">
            <li className='nav-child'>
                <NavLink to="/" activeStyle={activeStyle} exact={true}>Home</NavLink>
            </li>
            <li className='nav-child'>
                <NavLink to="/report" activeStyle={activeStyle}>Project Report</NavLink>
            </li>
            <li className='nav-child'>
                <NavLink to="/presentation" activeStyle={activeStyle}>Presentation</NavLink>
            </li>
            <li className='nav-child'>
                <NavLink to="/demo" activeStyle={activeStyle}>Demo Site</NavLink>
            </li>
        </ul>
    )
}

export default withRouter(Navbar);