import React from "react";
import { NavLink, withRouter } from "react-router-dom";

function Navbar(props) {
    const basename = props.basename
    let activeStyle = {
        backgroundColor: "#373c45"
    }
    return (
        <ul className="nav-ul">
            <li className='nav-child'>
                <NavLink to={basename + "/"} activeStyle={activeStyle} exact={true}>Home</NavLink>
            </li>
            <li className='nav-child'>
                <NavLink to={basename + "/report"} activeStyle={activeStyle}>Project Report</NavLink>
            </li>
            <li className='nav-child'>
                <NavLink to={basename + "/presentation"} activeStyle={activeStyle}>Presentation</NavLink>
            </li>
            <li className='nav-child'>
                <NavLink to={basename + "/demo"} activeStyle={activeStyle}>Demo Site</NavLink>
            </li>
        </ul>
    )
}

export default withRouter(Navbar);