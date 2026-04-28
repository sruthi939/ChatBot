import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from './pages/LandingPage'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)

  // In a real app, check localStorage/session here
  useEffect(() => {
    const onboarding = localStorage.getItem('hasSeenOnboarding')
    const auth = localStorage.getItem('isLoggedIn')
    if (onboarding) setHasSeenOnboarding(true)
    if (auth) setIsLoggedIn(true)
  }, [])

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true')
    setHasSeenOnboarding(true)
  }

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b]">
      <Routes>
        <Route 
          path="/" 
          element={
            !hasSeenOnboarding ? (
              <LandingPage onComplete={handleOnboardingComplete} />
            ) : !isLoggedIn ? (
              <Navigate to="/login" />
            ) : (
              <HomePage onLogout={handleLogout} />
            )
          } 
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Register />} />
        
        {/* Protected routes */}
        <Route path="/home" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/new-chat" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/history" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/bookmarks" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App