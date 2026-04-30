import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from './pages/LandingPage'
import { login as loginAPI, register as registerAPI } from './lib/api'

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(localStorage.getItem('hasSeenOnboarding') === 'true')
  const [error, setError] = useState('')

  const handleLogin = async (creds) => {
    try {
      setError('');
      const { data } = await loginAPI(creds);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  const handleRegister = async (userData) => {
    try {
      setError('');
      const { data } = await registerAPI(userData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setHasSeenOnboarding(true);
  };

  return (
    <div className="min-h-screen bg-[#0b141a]">
      <Routes>
        <Route 
          path="/" 
          element={
            !hasSeenOnboarding ? (
              <LandingPage onComplete={handleOnboardingComplete} />
            ) : !user ? (
              <Navigate to="/login" />
            ) : (
              <HomePage onLogout={handleLogout} />
            )
          } 
        />
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} error={error} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Register onRegister={handleRegister} error={error} /> : <Navigate to="/" />} />
        
        {/* Protected routes */}
        <Route path="/home" element={user ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App