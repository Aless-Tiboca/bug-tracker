import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Layout from './Layout';

const ProgrammerView = () => {
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        fetchBugs();
    }, []);

    const fetchBugs = async () => {
        const response = await api.get('/bugs');
        setBugs(response.data);
    };

    const deleteBug = async (bugId) => {
        await api.delete(`/bugs/${bugId}`);
        fetchBugs();
    };

    return (
        <Layout>
            <h1>Programmer Dashboard</h1>
            <ul>
                {bugs.map((bug) => (
                    <li key={bug.id}>
                        <Link to={`/bugs/${bug.id}`}>{bug.name}</Link>: {bug.description}
                        <button onClick={() => deleteBug(bug.id)} style={buttonStyle}>Delete</button>
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

const buttonStyle = {
    margin: '10px',
    padding: '5px 10px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#FF5733',
    color: '#fff',
};

export default ProgrammerView;
