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
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
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

    const handleSendMessage = async (text) => {
        const userMsg = { id: Date.now(), sender: 'user', text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => [...prev, userMsg]);
        setLoading(true);
        
        // Mock AI Response
        setTimeout(() => {
            const aiMsg = { id: Date.now() + 1, sender: 'bot', text: `As your AI Assistant, I've received your message: "${text}". How else can I assist you?`, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            setMessages(prev => [...prev, aiMsg]);
            setLoading(false);
        }, 1500);
    };

    const containerStyle = {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#0b141a',
        overflow: 'hidden',
        fontFamily: 'sans-serif'
    };

    const mainAreaStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    };

    return (
        <div style={containerStyle}>
            <Sidebar 
                selectedUser={selectedUser} 
                setSelectedUser={(u) => {
                    setSelectedUser(u);
                    setMessages([
                        { id: 1, sender: 'bot', text: `Hello! I am ${u.name}. How can I help you today?`, timestamp: '10:00 AM' }
                    ]);
                }} 
            />
            
            <div style={mainAreaStyle}>
                {notification && showBanner && (
                    <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', borderBottom: '1px solid rgba(239,68,68,0.2)', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Megaphone size={16} color="#ef4444" />
                            <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#ef4444', margin: 0 }}>{notification.message}</p>
                        </div>
                        <X size={16} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => setShowBanner(false)} />
                    </div>
                )}

                {selectedUser ? (
                    <ChatContainer 
                        selectedUser={{...selectedUser, messages}} 
                        onSendMessage={handleSendMessage} 
                        loading={loading}
                        onBack={() => setSelectedUser(null)} 
                    />
                ) : (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#8696a0', padding: '40px' }}>
                        <div style={{ padding: '40px', backgroundColor: '#111b21', borderRadius: '50%', marginBottom: '32px' }}>
                            <img src="https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png" style={{ width: '120px', opacity: 0.1, filter: 'invert(1)' }} alt="" />
                        </div>
                        <h1 style={{ color: '#e9edef', fontSize: '32px', fontWeight: '300', marginBottom: '16px' }}>ChatBot Web</h1>
                        <p style={{ maxWidth: '450px', lineHeight: '1.6', fontSize: '14px' }}>
                            Send and receive messages with your AI Core. <br /> 
                            All conversations are end-to-end encrypted and secure.
                        </p>
                        <div style={{ marginTop: 'auto', borderTop: '1px solid #262626', width: '100%', paddingTop: '20px', fontSize: '12px' }}>
                            Neural Core v1.0 • Stable Connection
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage