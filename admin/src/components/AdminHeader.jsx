import React, { useState } from 'react'
import { Search, Bell, X, Info, ShieldAlert } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const AdminHeader = ({ user }) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/users?search=${encodeURIComponent(search)}`);
        }
    };

    const headerStyle = {
        height: '80px',
        width: '100%',
        backgroundColor: 'rgba(11,11,11,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #262626',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        position: 'sticky',
        top: 0,
        zIndex: 50
    };

    const notificationPanelStyle = {
        position: 'absolute',
        top: '85px',
        right: '40px',
        width: '320px',
        backgroundColor: '#171717',
        border: '1px solid #262626',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        padding: '24px',
        zIndex: 100,
        animation: 'slideIn 0.3s ease'
    };

    return (
        <header style={headerStyle}>
            <style>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Functional Search Bar */}
            <form onSubmit={handleSearch} style={{ position: 'relative', width: '400px' }}>
                <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#4b5563' }} size={18} />
                <input 
                    type="text" 
                    placeholder="Search users by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: '100%',
                        backgroundColor: '#0b0b0b',
                        border: '1px solid #262626',
                        padding: '12px 16px 12px 48px',
                        borderRadius: '16px',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#22c55e'}
                    onBlur={(e) => e.target.style.borderColor = '#262626'}
                />
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {/* Notifications Bell */}
                <div style={{ position: 'relative' }}>
                    <div 
                        onClick={() => setShowNotifications(!showNotifications)}
                        style={{ position: 'relative', cursor: 'pointer', padding: '8px', borderRadius: '12px', backgroundColor: showNotifications ? '#262626' : 'transparent', transition: 'all 0.2s' }}
                    >
                        <Bell style={{ color: showNotifications ? '#22c55e' : '#6b7280' }} size={20} />
                        <div style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid #0b0b0b' }} />
                    </div>

                    {showNotifications && (
                        <div style={notificationPanelStyle}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h4 style={{ margin: 0, fontWeight: 'bold' }}>Notifications</h4>
                                <X size={16} style={{ color: '#4b5563', cursor: 'pointer' }} onClick={() => setShowNotifications(false)} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: 'rgba(34,197,94,0.05)', borderRadius: '16px', border: '1px solid rgba(34,197,94,0.1)' }}>
                                    <ShieldAlert size={18} color="#22c55e" />
                                    <div>
                                        <p style={{ fontSize: '12px', fontWeight: 'bold', margin: '0 0 4px 0', color: 'white' }}>System Online</p>
                                        <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>The AI engine has successfully initialized.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: 'rgba(59,130,246,0.05)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.1)' }}>
                                    <Info size={18} color="#3b82f6" />
                                    <div>
                                        <p style={{ fontSize: '12px', fontWeight: 'bold', margin: '0 0 4px 0', color: 'white' }}>Admin Seeding</p>
                                        <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>System administrator account verified.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div style={{ height: '40px', width: '1px', backgroundColor: '#262626' }} />

                {/* Profile Section */}
                <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', color: 'white' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{user.name}</p>
                        <p style={{ fontSize: '10px', color: '#22c55e', textTransform: 'uppercase', fontWeight: 'bold', margin: 0 }}>{user.role}</p>
                    </div>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: '16px', border: '1px solid rgba(34,197,94,0.2)', overflow: 'hidden' }}>
                        <img 
                            src={user.avatar} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            alt="Admin" 
                        />
                    </div>
                </Link>
            </div>
        </header>
    )
}

export default AdminHeader
