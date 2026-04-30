import React from 'react'
import { UserCheck, UserX, Eye, Download, SearchX } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Users = ({ users, onToggleStatus }) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('search')?.toLowerCase() || '';

    // Filter users based on search query
    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(query) || 
        u.email.toLowerCase().includes(query)
    );

    const exportToCSV = () => {
        const headers = ["Name,Email,Role,Joined\n"];
        const rows = filteredUsers.map(u => `${u.name},${u.email},${u.role},${u.createdAt}\n`);
        const blob = new Blob([headers, ...rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users_audit_${new Date().toLocaleDateString()}.csv`;
        a.click();
    };

    const cardStyle = {
        backgroundColor: '#171717',
        border: '1px solid #262626',
        borderRadius: '32px',
        overflow: 'hidden',
        marginTop: '32px'
    };

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>
                        {query ? 'Search Results' : 'User Management'}
                    </h1>
                    <p style={{ color: '#6b7280', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '4px', letterSpacing: '1px' }}>
                        {query ? `Showing results for "${query}"` : 'Audit and control system access'}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    {query && (
                        <Link to="/users" style={{ padding: '12px 24px', backgroundColor: '#262626', borderRadius: '16px', color: 'white', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none' }}>
                            Clear Search
                        </Link>
                    )}
                    <button 
                        onClick={exportToCSV}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            backgroundColor: '#171717',
                            border: '1px solid #262626',
                            borderRadius: '16px',
                            color: '#6b7280',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        <Download size={14} />
                        Export Audit Log
                    </button>
                </div>
            </div>

            <div style={cardStyle}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#1a1a1a', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6b7280', textAlign: 'left' }}>
                        <tr>
                            <th style={{ padding: '24px 32px' }}>Account</th>
                            <th style={{ padding: '24px 32px' }}>Status</th>
                            <th style={{ padding: '24px 32px' }}>Join Date</th>
                            <th style={{ padding: '24px 32px', textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ color: '#9ca3af' }}>
                        {filteredUsers.map(u => (
                            <tr key={u._id} style={{ borderTop: '1px solid #262626' }}>
                                <td style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', overflow: 'hidden', backgroundColor: '#0b0b0b' }}>
                                        <img src={u.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 'bold', color: 'white', margin: 0 }}>{u.name}</p>
                                        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{u.email}</p>
                                    </div>
                                </td>
                                <td style={{ padding: '24px 32px' }}>
                                    <span style={{ 
                                        padding: '4px 12px', 
                                        borderRadius: '20px', 
                                        fontSize: '10px', 
                                        fontWeight: 'bold', 
                                        textTransform: 'uppercase',
                                        backgroundColor: u.role === 'admin' ? 'rgba(34,197,94,0.1)' : u.role === 'banned' ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)',
                                        color: u.role === 'admin' ? '#22c55e' : u.role === 'banned' ? '#ef4444' : '#3b82f6'
                                    }}>
                                        {u.role}
                                    </span>
                                </td>
                                <td style={{ padding: '24px 32px', fontSize: '12px' }}>
                                    {new Date(u.createdAt).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '24px 32px', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                        <Link 
                                            to={`/user/${u._id}`}
                                            style={{ padding: '10px', backgroundColor: '#0b0b0b', borderRadius: '12px', color: '#4b5563', display: 'flex' }}
                                        >
                                            <Eye size={18} />
                                        </Link>
                                        {u.role !== 'admin' && (
                                            <button 
                                                onClick={() => onToggleStatus(u._id)}
                                                style={{ 
                                                    padding: '10px', 
                                                    borderRadius: '12px', 
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    backgroundColor: u.role === 'banned' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', 
                                                    color: u.role === 'banned' ? '#22c55e' : '#ef4444',
                                                    display: 'flex'
                                                }}
                                            >
                                                {u.role === 'banned' ? <UserCheck size={18} /> : <UserX size={18} />}
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ padding: '60px', textAlign: 'center' }}>
                                    <SearchX size={40} style={{ color: '#262626', marginBottom: '16px' }} />
                                    <p style={{ margin: 0, color: '#4b5563', fontWeight: 'bold' }}>No users found matching your search.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users
