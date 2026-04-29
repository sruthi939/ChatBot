import React, { useState } from 'react'
import { Shield, Key, Mail, RefreshCcw } from 'lucide-react'
import { API } from '../App'

const AdminProfile = () => {
    const user = JSON.parse(localStorage.getItem('adminUser'));
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ text: '', type: '' });

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            return setMsg({ text: 'Passwords do not match', type: 'error' });
        }
        setLoading(true);
        try {
            await API.post('/auth/change-password', {
                userId: user.id,
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            });
            setMsg({ text: 'Security credentials updated successfully', type: 'success' });
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setMsg({ text: err.response?.data?.message || 'Update failed', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const cardStyle = {
        backgroundColor: '#171717',
        border: '1px solid #262626',
        borderRadius: '32px',
        padding: '40px',
        marginTop: '32px'
    };

    const inputStyle = {
        width: '100%',
        backgroundColor: '#0b0b0b',
        border: '1px solid #262626',
        borderRadius: '16px',
        padding: '16px 16px 16px 48px',
        outline: 'none',
        color: 'white',
        fontSize: '14px',
        marginTop: '8px'
    };

    const labelStyle = {
        fontSize: '10px',
        fontWeight: 'bold',
        color: '#6b7280',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginLeft: '4px'
    };

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-in-out', maxWidth: '800px' }}>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            
            <div>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>Security Center</h1>
                <p style={{ color: '#6b7280', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '4px', letterSpacing: '1px' }}>Manage administrator credentials</p>
            </div>

            <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '48px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '24px', overflow: 'hidden', border: '2px solid #22c55e' }}>
                        <img src={user.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{user.name}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', fontSize: '12px', fontWeight: 'bold', marginTop: '4px' }}>
                            <Shield size={14} />
                            <span>System Administrator</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ position: 'relative' }}>
                        <label style={labelStyle}>Current Access Key</label>
                        <Key style={{ position: 'absolute', left: '16px', top: '38px', color: '#4b5563' }} size={18} />
                        <input 
                            type="password" 
                            placeholder="••••••••••••"
                            required
                            style={inputStyle}
                            value={passwords.currentPassword}
                            onChange={e => setPasswords({...passwords, currentPassword: e.target.value})}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div style={{ position: 'relative' }}>
                            <label style={labelStyle}>New Access Key</label>
                            <Key style={{ position: 'absolute', left: '16px', top: '38px', color: '#4b5563' }} size={18} />
                            <input 
                                type="password" 
                                placeholder="••••••••••••"
                                required
                                style={inputStyle}
                                value={passwords.newPassword}
                                onChange={e => setPasswords({...passwords, newPassword: e.target.value})}
                            />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <label style={labelStyle}>Confirm New Key</label>
                            <Key style={{ position: 'absolute', left: '16px', top: '38px', color: '#4b5563' }} size={18} />
                            <input 
                                type="password" 
                                placeholder="••••••••••••"
                                required
                                style={inputStyle}
                                value={passwords.confirmPassword}
                                onChange={e => setPasswords({...passwords, confirmPassword: e.target.value})}
                            />
                        </div>
                    </div>

                    {msg.text && (
                        <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: msg.type === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', border: msg.type === 'error' ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(34,197,94,0.2)' }}>
                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: msg.type === 'error' ? '#ef4444' : '#22c55e', textAlign: 'center' }}>{msg.text}</p>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            padding: '18px',
                            backgroundColor: '#22c55e',
                            color: 'black',
                            fontWeight: 'bold',
                            borderRadius: '16px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            marginTop: '12px',
                            transition: 'all 0.2s'
                        }}
                    >
                        {loading ? <RefreshCcw size={20} className="animate-spin" /> : <Shield size={20} />}
                        Update Security Credentials
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminProfile
