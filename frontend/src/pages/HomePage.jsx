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

const HomePage = ({ onLogout }) => {
    const [selectedUser, setSelectedUser] = useState(null)
    const location = useLocation()

    // Determine what to show in the main area
    const renderMainContent = () => {
        if (selectedUser) {
            return <ChatContainer selectedUser={selectedUser} onBack={() => setSelectedUser(null)} />
        }

        switch (location.pathname) {
            case '/profile':
                return <Profile onLogout={onLogout} />
            case '/new-chat':
                return <NewChatList onSelect={(text) => setSelectedUser({ name: 'AI Assistant', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Bot1', messages: [{ id: 1, sender: 'user', text: text, timestamp: 'Just now' }] })} />
            case '/history':
                return <History />
            case '/bookmarks':
                return <Bookmarks />
            case '/settings':
                return <Settings onLogout={onLogout} />
            default:
                return <Dashboard 
                    onNewChat={(title) => setSelectedUser({ name: 'AI Assistant', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Bot1', messages: [{ id: 1, sender: 'bot', text: `How can I help you with ${title}?`, timestamp: 'Just now' }] })} 
                    onSelectChat={setSelectedUser}
                />
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
