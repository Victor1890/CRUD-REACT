import React, { Component } from 'react';
import '../css/NavBar.css';

import { Link } from "react-router-dom";

const mystyle = {
    color: 'white',
};


class NavBar extends Component{
    render(){
        return(
            <nav >
                <ul className='nav-links'>
                    <Link style={mystyle} to='/cliente'>
                        <li>Cliente</li>
                    </Link>

                    <Link style={mystyle} to='/servicios'>
                        <li>Servicios</li>
                    </Link>
                </ul>
            </nav>
        );
    }
}

export default NavBar;