import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <h1>Welcome to Bug Tracker</h1>
            <p>This application helps manage and track bugs in software development.</p>
            <p>Please choose your role to continue:</p>
            <div style={buttonContainerStyle}>
                <button onClick={() => navigate('/login/programmer')} style={buttonStyle}>
                    Programmer
                </button>
                <button onClick={() => navigate('/login/verifier')} style={buttonStyle}>
                    Verifier
                </button>
            </div>
        </Layout>
    );
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
};

const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff'
};

export default Home;
