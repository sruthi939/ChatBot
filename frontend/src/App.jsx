import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
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
              <HomePage />
            )
          } 
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        
        {/* Protected routes */}
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/new-chat" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/history" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/bookmarks" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App