import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { UserContext } from '../UserContext';

const BugDetail = () => {
    const { bugId } = useParams();
    const [bug, setBug] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetchBug();
        fetchComments();
    }, [bugId]);

    const fetchBug = async () => {
        const response = await api.get(`/bugs/${bugId}`);
        setBug(response.data);
    };

    const fetchComments = async () => {
        const response = await api.get(`/bugs/${bugId}/comments`);
        setComments(response.data);
    };

    const addComment = async (e) => {
        e.preventDefault();
        if (user) {
            const username = user.name;
            await api.post(`/bugs/${bugId}/comments`, { text: commentText, username });
            setCommentText('');
            fetchComments();
        }
    };

    return (
        <div style={containerStyle}>
            {bug && (
                <>
                    <h1>{bug.name}</h1>
                    <p>{bug.description}</p>
                </>
            )}
            <h2>Comments</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        {comment.text} - <i>{comment.username}</i>
                    </li>
                ))}
            </ul>
            <form onSubmit={addComment}>
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                    style={textareaStyle}
                ></textarea>
                <button type="submit" style={buttonStyle}>Add Comment</button>
            </form>
        </div>
    );
};

const containerStyle = {
    padding: '20px',
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

export default BugDetail;
