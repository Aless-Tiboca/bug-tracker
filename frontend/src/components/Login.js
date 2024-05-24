import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import Layout from './Layout';
import { UserContext } from '../UserContext';

const Login = () => {
    const { role } = useParams();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLogin = async () => {
        try {
            const response = await api.post(`/login/${role}`, { email });
            if (response.status === 200) {
                setUser({ ...response.data, role });
                if (role === 'programmer') {
                    navigate('/programmer');
                } else if (role === 'verifier') {
                    navigate('/verifier');
                }
            }
        } catch (err) {
            setError('Invalid login credentials');
        }
    };

    return (
        <Layout>
            <h2>{`Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`}</h2>
            <form onSubmit={e => { e.preventDefault(); handleLogin(); }} style={formStyle}>
                <div style={inputContainerStyle}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                {error && <p style={errorStyle}>{error}</p>}
                <button type="submit" style={buttonStyle}>Login</button>
            </form>
        </Layout>
    );
};

const formStyle = {
    display: 'inline-block',
    textAlign: 'left'
};

const inputContainerStyle = {
    marginBottom: '10px'
};

const inputStyle = {
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '16px'
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff'
};

const errorStyle = {
    color: 'red',
    marginTop: '10px'
};

export default Login;
