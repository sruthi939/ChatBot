import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import Dashboard from './Dashboard'
import Profile from './Profile'
import { useLocation } from 'react-router-dom'

const HomePage = () => {
    const [selectedUser, setSelectedUser] = useState(null)
    const location = useLocation()

    // Determine what to show in the main area
    const renderMainContent = () => {
        if (selectedUser) {
            return <ChatContainer selectedUser={selectedUser} />
        }

        switch (location.pathname) {
            case '/profile':
                return <Profile />
            case '/history':
                return <div className='flex-1 flex items-center justify-center text-gray-500'>History Page (Coming Soon)</div>
            case '/bookmarks':
                return <div className='flex-1 flex items-center justify-center text-gray-500'>Bookmarks Page (Coming Soon)</div>
            case '/settings':
                return <div className='flex-1 flex items-center justify-center text-gray-500'>Settings Page (Coming Soon)</div>
            default:
                return <Dashboard />
        }
    }

    return (
        <div className='flex h-screen bg-[#0b0b0b] overflow-hidden'>
            <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            <div className='flex-1 flex flex-col relative'>
                {/* Close chat button if in mobile and chat is open */}
                {selectedUser && (
                    <button 
                        onClick={() => setSelectedUser(null)}
                        className='absolute top-6 right-20 z-20 md:hidden p-2 bg-[#171717] rounded-xl border border-[#262626]'
                    >
                        Back
                    </button>
                )}
                {renderMainContent()}
            </div>
        </div>
    )
}

export default HomePage