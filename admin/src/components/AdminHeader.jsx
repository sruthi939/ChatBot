import React from 'react'
import { Search, Bell, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const AdminHeader = ({ user }) => {
    const headerStyle = {
        height: '80px',
        width: '100%',
        backgroundColor: 'rgba(11,11,11,0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #262626',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 40px',
        position: 'sticky',
        top: 0,
        zIndex: 50
    };

    return (
        <header style={headerStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <Search style={{ color: '#6b7280', cursor: 'pointer' }} size={20} />
                <Bell style={{ color: '#6b7280', cursor: 'pointer' }} size={20} />
                
                <div style={{ height: '40px', width: '1px', backgroundColor: '#262626' }} />

                <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', color: 'white' }}>
                    <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
                        <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{user.name}</p>
                        <p style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', fontWeight: 'bold', margin: 0 }}>{user.role}</p>
                    </div>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: '16px', border: '1px solid rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyItems: 'center', overflow: 'hidden' }}>
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
