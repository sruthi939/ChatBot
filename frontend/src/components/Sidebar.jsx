import React from 'react'
import { Search, MoreVertical, MessageSquarePlus, Filter, CheckCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ selectedUser, setSelectedUser }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const recentChats = [
        { id: 'ai', name: 'Neural Core AI', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Bot1', lastMsg: 'I am ready for your commands.', time: '12:45 PM', unread: 1, online: true },
        { id: 'support', name: 'System Security', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Support', lastMsg: 'Access granted successfully.', time: 'Yesterday', unread: 0, online: false },
        { id: 'dev', name: 'Global Engine', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev', lastMsg: 'Optimization complete.', time: 'Monday', unread: 0, online: true }
    ];

    const sidebarStyle = {
        width: '380px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#111b21',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        zIndex: 50
    };

    return (
        <div style={sidebarStyle}>
            {/* Header */}
            <div style={{ height: '60px', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#202c33' }}>
                <div onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                    <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || 'User'}`} 
                        style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#111b21' }} 
                        alt="Profile" 
                    />
                </div>
                <div style={{ display: 'flex', gap: '24px', color: '#aebac1' }}>
                    <MessageSquarePlus size={20} style={{ cursor: 'pointer' }} />
                    <MoreVertical size={20} style={{ cursor: 'pointer' }} />
                </div>
            </div>

            {/* Search */}
            <div style={{ padding: '8px', backgroundColor: '#111b21' }}>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#202c33', borderRadius: '12px', padding: '0 12px' }}>
                    <Search size={18} color="#8696a0" />
                    <input 
                        type="text" 
                        placeholder="Search chats..." 
                        style={{ width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', padding: '10px', color: '#d1d7db', fontSize: '14px' }}
                    />
                </div>
            </div>

            {/* List */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {recentChats.map((chat) => (
                    <div 
                        key={chat.id}
                        onClick={() => setSelectedUser(chat)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            cursor: 'pointer',
                            backgroundColor: selectedUser?.id === chat.id ? '#2a3942' : 'transparent',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = selectedUser?.id === chat.id ? '#2a3942' : '#202c33'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedUser?.id === chat.id ? '#2a3942' : 'transparent'}
                    >
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                            <img src={chat.avatar} style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#202c33' }} alt="" />
                            {chat.online && <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '10px', height: '10px', backgroundColor: '#00a884', borderRadius: '50%', border: '2px solid #111b21' }} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0, paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '500', color: '#e9edef', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chat.name}</h4>
                                <span style={{ fontSize: '12px', color: chat.unread > 0 ? '#00a884' : '#8696a0', fontWeight: chat.unread > 0 ? 'bold' : 'normal' }}>{chat.time}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', overflow: 'hidden' }}>
                                    <CheckCheck size={16} color="#53bdeb" style={{ flexShrink: 0 }} />
                                    <p style={{ margin: 0, fontSize: '14px', color: '#8696a0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chat.lastMsg}</p>
                                </div>
                                {chat.unread > 0 && (
                                    <div style={{ minWidth: '20px', height: '20px', backgroundColor: '#00a884', color: 'black', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', padding: '0 6px' }}>
                                        {chat.unread}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
