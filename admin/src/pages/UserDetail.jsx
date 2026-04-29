import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MessageSquare, Shield, Clock } from 'lucide-react'
import { API } from '../App'

const UserDetail = () => {
    const { id } = useParams();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await API.get(`/admin/user-history/${id}`, { headers: { 'user-id': JSON.parse(localStorage.getItem('adminUser')).id } });
                setHistory(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [id]);

    const cardStyle = {
        backgroundColor: '#171717',
        border: '1px solid #262626',
        borderRadius: '32px',
        padding: '32px',
        marginTop: '32px'
    };

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>

            <Link to="/users" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', marginBottom: '24px' }}>
                <ArrowLeft size={16} />
                Back to Users
            </Link>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>User Audit Log</h1>
                    <p style={{ color: '#6b7280', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '4px', letterSpacing: '1px' }}>Deep inspection of user activity</p>
                </div>
            </div>

            <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #262626' }}>
                    <MessageSquare color="#3b82f6" size={20} />
                    <h3 style={{ fontWeight: 'bold', margin: 0 }}>Conversation History</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {history.map((msg, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', backgroundColor: '#0b0b0b', borderRadius: '24px', border: '1px solid #262626' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ 
                                        padding: '4px 10px', 
                                        borderRadius: '8px', 
                                        fontSize: '10px', 
                                        fontWeight: 'bold', 
                                        textTransform: 'uppercase',
                                        backgroundColor: msg.sender === 'bot' ? 'rgba(139,92,246,0.1)' : 'rgba(59,130,246,0.1)',
                                        color: msg.sender === 'bot' ? '#8b5cf6' : '#3b82f6'
                                    }}>
                                        {msg.sender === 'bot' ? 'AI Assistant' : 'User'}
                                    </span>
                                    <span style={{ fontSize: '10px', color: '#4b5563', fontWeight: 'bold' }}>
                                        <Clock size={10} style={{ marginRight: '4px' }} />
                                        {new Date(msg.timestamp).toLocaleString()}
                                    </span>
                                </div>
                                <span style={{ fontSize: '10px', color: '#22c55e', fontWeight: 'bold', opacity: 0.5 }}>{msg.tokens || 0} tokens consumed</span>
                            </div>
                            <p style={{ margin: 0, color: '#d1d5db', lineHeight: '1.6', fontSize: '15px' }}>{msg.text}</p>
                        </div>
                    ))}
                    {history.length === 0 && <p style={{ textAlign: 'center', padding: '40px', color: '#4b5563' }}>No message history found for this user.</p>}
                </div>
            </div>
        </div>
    )
}

export default UserDetail
