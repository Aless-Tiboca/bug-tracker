import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Layout from './Layout';

const VerifierView = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        fetchBugs();
    }, []);

    const fetchBugs = async () => {
        const response = await api.get('/bugs');
        setBugs(response.data);
    };

    const addBug = async (e) => {
        e.preventDefault();
        await api.post('/bugs', { name, description });
        setName('');
        setDescription('');
        fetchBugs();
    };

    return (
        <Layout>
            <h1>Verifier Dashboard</h1>
            <form onSubmit={addBug} style={formStyle}>
                <input
                    type="text"
                    placeholder="Bug name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={inputStyle}
                />
                <textarea
                    placeholder="Bug description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={textareaStyle}
                ></textarea>
                <button type="submit" style={buttonStyle}>Add Bug</button>
            </form>
            <h2>Bug List</h2>
            <ul>
                {bugs.map((bug) => (
                    <li key={bug.id}>
                        <Link to={`/bugs/${bug.id}`}>{bug.name}</Link>: {bug.description}
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

const formStyle = {
    display: 'inline-block',
    textAlign: 'left',
};

const inputStyle = {
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '16px',
    marginBottom: '10px',
};

const textareaStyle = {
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '16px',
    marginBottom: '10px',
    height: '100px',
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
};

export default VerifierView;
