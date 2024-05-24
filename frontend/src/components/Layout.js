import React from 'react';

const Layout = ({ children }) => {
    return (
        <div style={layoutStyle}>
            <div style={contentStyle}>
                {children}
            </div>
        </div>
    );
};

const layoutStyle = {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '20px',  // Add padding at the top if needed
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
};

const contentStyle = {
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
};

export default Layout;
