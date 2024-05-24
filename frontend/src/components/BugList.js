import React, { useEffect, useState } from 'react';
import api from '../api';

const BugList = () => {
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
        <div>
            <h2>Bug List</h2>
            <ul>
                {bugs.map((bug) => (
                    <li key={bug.bugId}>
                        {bug.name}: {bug.description}
                        <button onClick={() => deleteBug(bug.bugId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BugList;
