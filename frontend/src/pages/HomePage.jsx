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
import { getLatestNotification } from '../lib/api'
import { Megaphone, X } from 'lucide-react'

const HomePage = ({ onLogout }) => {
    const [selectedUser, setSelectedUser] = useState(null)
    const [notification, setNotification] = useState(null)
    const [showBanner, setShowBanner] = useState(true)
    const location = useLocation()

    React.useEffect(() => {
        const fetchNotify = async () => {
            try {
                const { data } = await getLatestNotification();
                if (data) setNotification(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchNotify();
    }, []);

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
                {notification && showBanner && (
                    <div className='bg-red-500/10 border-b border-red-500/20 p-3 flex items-center justify-between animate-in slide-in-from-top duration-500'>
                        <div className='flex items-center gap-3 px-4'>
                            <Megaphone className='size-4 text-red-500' />
                            <p className='text-xs font-bold text-red-500 tracking-wide'>{notification.message}</p>
                        </div>
                        <button onClick={() => setShowBanner(false)} className='p-1 hover:bg-red-500/20 rounded-lg transition-all'>
                            <X className='size-4 text-red-500' />
                        </button>
                    </div>
                )}
                {renderMainContent()}
            </div>
        </div>
    )
}

export default HomePage
