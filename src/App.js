import { AuthProvider } from './AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedsPage from './pages/FeedsPage';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import React from 'react';
import SignupPage from './pages/SignupPage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/feeds' element={<FeedsPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<SignupPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;