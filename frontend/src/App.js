import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProgrammerView from './components/ProgrammerView';
import VerifierView from './components/VerifierView';
import Home from './components/Home';
import Login from './components/Login';
import Header from './components/Header';
import BugDetail from './components/BugDetail';
import { UserContext } from './UserContext';

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                <Header />
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login/:role" element={<Login />} />
                        <Route path="/programmer" element={<ProgrammerView />} />
                        <Route path="/verifier" element={<VerifierView />} />
                        <Route path="/bugs/:bugId" element={<BugDetail />} />
                    </Routes>
                </div>
            </Router>
        </UserContext.Provider>
    );
};

export default App;
