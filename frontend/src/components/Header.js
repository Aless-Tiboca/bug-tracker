import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const role = location.pathname.split('/')[1];

    return (
        <header style={headerStyle}>
            <h1>Bug Tracker</h1>
            <nav>
                <ul style={navStyle}>
                    <li style={navItemStyle}>
                        <Link to="/" style={linkStyle}>Home</Link>
                    </li>
                    {role === 'programmer' && (
                        <li style={navItemStyle}>
                            <Link to="/programmer" style={linkStyle}>Programmer Dashboard</Link>
                        </li>
                    )}
                    {role === 'verifier' && (
                        <li style={navItemStyle}>
                            <Link to="/verifier" style={linkStyle}>Verifier Dashboard</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

const headerStyle = {
    background: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'center'
};

const navStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center'
};

const navItemStyle = {
    margin: '0 10px'
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
};

export default Header;
