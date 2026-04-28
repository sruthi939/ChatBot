import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import Dashboard from './Dashboard'
import Profile from './Profile'
import NewChatList from './NewChatList'
import History from './History'
import Bookmarks from './Bookmarks'
import Settings from './Settings'
import { useLocation } from 'react-router-dom'

const HomePage = () => {
    const [selectedUser, setSelectedUser] = useState(null)
    const location = useLocation()

    // Determine what to show in the main area
    const renderMainContent = () => {
        if (selectedUser) {
            return <ChatContainer selectedUser={selectedUser} onBack={() => setSelectedUser(null)} />
        }

        switch (location.pathname) {
            case '/profile':
                return <Profile />
            case '/new-chat':
                return <NewChatList onSelect={(text) => setSelectedUser({ name: 'New Chat', lastMessage: text })} />
            case '/history':
                return <History />
            case '/bookmarks':
                return <Bookmarks />
            case '/settings':
                return <Settings />
            default:
                return <Dashboard onNewChat={() => setSelectedUser({ name: 'New Chat' })} />
        }
    }

    return (
        <div className='flex h-screen bg-[#0b0b0b] overflow-hidden'>
            <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            <div className='flex-1 flex flex-col relative'>
                {renderMainContent()}
            </div>
        </div>
    )
}

export default HomePage
