import React from 'react'
import { LayoutDashboard, Users, Megaphone, Settings, LogOut, Shield, TrendingUp, Terminal } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ onLogout }) => {
    const menuItems = [
        { id: '', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'users', label: 'Users', icon: <Users size={20} /> },
        { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={20} /> },
        { id: 'broadcast', label: 'Broadcast', icon: <Megaphone size={20} /> },
        { id: 'logs', label: 'System Logs', icon: <Terminal size={20} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    ]

    const sidebarStyle = {
        width: '260px',
        height: '100vh',
        backgroundColor: '#171717',
        borderRight: '1px solid #262626',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100
    };

    const linkStyle = (isActive) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '16px',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'all 0.2s',
        marginBottom: '8px',
        color: isActive ? 'black' : '#6b7280',
        backgroundColor: isActive ? '#22c55e' : 'transparent',
    });

    return (
        <div style={sidebarStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px', padding: '0 8px' }}>
                <div style={{ padding: '8px', backgroundColor: '#22c55e', borderRadius: '12px' }}>
                    <Shield size={24} color="black" />
                </div>
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Admin</h1>
            </div>

            <nav style={{ flex: 1 }}>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={`/${item.id}`}
                        style={({ isActive }) => linkStyle(isActive)}
                    >
                        {item.icon}
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <button 
                onClick={onLogout}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    color: '#ef4444',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    transition: 'all 0.2s'
                }}
            >
                <LogOut size={20} />
                Logout
            </button>
        </div>
    )
}

export default Sidebar
