import React, { useState, useEffect } from 'react'
import { Terminal, RefreshCw } from 'lucide-react'
import { API } from '../App'

const SystemLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('adminUser'));

    const fetchLogs = async () => {
        try {
            const { data } = await API.get('/admin/recent-messages', { headers: { 'user-id': user.id } });
            setLogs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(fetchLogs, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

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
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>System Logs</h1>
                    <p style={{ color: '#6b7280', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '4px', letterSpacing: '1px' }}>Monitor real-time engine activity</p>
                </div>
                <button 
                    onClick={fetchLogs}
                    style={{ padding: '16px', backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '16px', color: '#6b7280', cursor: 'pointer' }}
                >
                    <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            <div style={cardStyle}>
                <div style={{ padding: '24px 32px', borderBottom: '1px solid #262626', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Terminal color="#22c55e" size={20} />
                    <h3 style={{ fontWeight: 'bold', margin: 0 }}>Console Output</h3>
                </div>
                
                <div style={{ padding: '16px', fontFamily: 'monospace', fontSize: '13px' }}>
                    {logs.map((log) => (
                        <div key={log._id} style={{ display: 'flex', gap: '16px', padding: '12px 16px', borderRadius: '12px', transition: 'background 0.2s' }}>
                            <span style={{ color: '#4b5563', minWidth: '160px' }}>[{new Date(log.timestamp).toLocaleString()}]</span>
                            <span style={{ fontWeight: 'bold', minWidth: '80px', color: log.sender === 'bot' ? '#8b5cf6' : '#3b82f6' }}>
                                {log.sender === 'bot' ? 'AI_RESP' : 'USER_MSG'}
                            </span>
                            <span style={{ color: '#6b7280', minWidth: '120px', fontWeight: 'bold' }}>{log.user?.name || 'Unknown'}</span>
                            <span style={{ flex: 1, color: '#d1d5db', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {log.text}
                            </span>
                            <span style={{ color: '#22c55e', fontWeight: 'bold', opacity: 0.5 }}>{log.tokens || 0} tks</span>
                        </div>
                    ))}
                    {logs.length === 0 && <p style={{ textAlign: 'center', padding: '40px', color: '#4b5563' }}>No recent activity detected.</p>}
                </div>
            </div>
        </div>
    )
}

export default SystemLogs
