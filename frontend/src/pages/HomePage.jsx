import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import { useLocation } from 'react-router-dom'
import { getLatestNotification, getChatHistory, sendMessage as sendAPIMessage } from '../lib/api'
import { Megaphone, X } from 'lucide-react'

const HomePage = ({ onLogout }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [selectedUser, setSelectedUser] = useState(null)
    const [notification, setNotification] = useState(null)
    const [showBanner, setShowBanner] = useState(true)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [realHistory, setRealHistory] = useState([])

    const location = useLocation()

    // Load Real History on Start
    useEffect(() => {
        const fetchInitialData = async () => {
            if (!user.id) return;
            try {
                const [notifyRes, historyRes] = await Promise.all([
                    getLatestNotification(),
                    getChatHistory(user.id)
                ]);
                if (notifyRes.data) setNotification(notifyRes.data);
                if (historyRes.data) {
                    setRealHistory(historyRes.data);
                    setMessages(historyRes.data);
                    setSelectedUser({
                        id: 'ai',
                        name: 'Neural Core AI',
                        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Bot1'
                    });
                }
            } catch (err) {
                console.error('INIT_FETCH_ERROR:', err);
            }
        };
        fetchInitialData();
    }, []);

    const handleSendMessage = async (text) => {
        if (!user.id) return;

        // 1. Optimistic Update (Show user message immediately)
        const optimisticUserMsg = { 
            id: Date.now(), 
            sender: 'user', 
            text, 
            timestamp: new Date().toISOString() 
        };
        setMessages(prev => [...prev, optimisticUserMsg]);
        setLoading(true);

        try {
            // 2. Real Backend Call
            const { data } = await sendAPIMessage({ userId: user.id, text, persona: 'Architect' });
            
            // 3. Sync with Real Database Records (Replace optimistic with real IDs)
            setMessages(prev => {
                const filtered = prev.filter(m => m.id !== optimisticUserMsg.id);
                return [...filtered, data.userMsg, data.botMsg];
            });
            setRealHistory(prev => [...prev, data.userMsg, data.botMsg]);
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.response?.data?.error || 'System Timeout';
            alert(`AI_CONNECTION_ERROR: ${errorMsg}`);
            // Rollback optimistic update if failed
            setMessages(prev => prev.filter(m => m.id !== optimisticUserMsg.id));
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#0b141a',
        overflow: 'hidden',
        fontFamily: 'sans-serif'
    };

    return (
        <div style={containerStyle}>
            <Sidebar 
                selectedUser={selectedUser} 
                setSelectedUser={setSelectedUser} 
                lastMessage={messages[messages.length - 1]}
            />
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
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
                        <h1 style={{ color: '#e9edef', fontSize: '32px', fontWeight: '300', marginBottom: '16px' }}>Neural Core Chat</h1>
                        <p style={{ maxWidth: '450px', lineHeight: '1.6', fontSize: '14px' }}>
                            Encrypted AI Messaging Protocol • Stable Connection Established
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage