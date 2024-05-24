import React, { useState } from 'react';
import api from '../api';

const AddBug = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const addBug = async (e) => {
        e.preventDefault();
        await api.post('/bugs', { name, description });
        setName('');
        setDescription('');
    };

    return (
        <form onSubmit={addBug}>
            <input
                type="text"
                placeholder="Bug name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                placeholder="Bug description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button type="submit">Add Bug</button>
        </form>
    );
};

export default AddBug;
