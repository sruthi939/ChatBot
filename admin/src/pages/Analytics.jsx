import React, { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, DollarSign, Users } from 'lucide-react'
import { API } from '../App'

const Analytics = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('adminUser'));

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await API.get('/admin/user-analytics', { headers: { 'user-id': user.id } });
                setData(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    const cardStyle = {
        backgroundColor: '#171717',
        border: '1px solid #262626',
        borderRadius: '32px',
        padding: '32px',
    };

    if (loading) return <div style={{ color: '#6b7280', padding: '40px', textAlign: 'center', fontSize: '14px' }}>Computing financial data...</div>;

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            
            <div>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>Cost Analytics</h1>
                <p style={{ color: '#6b7280', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '4px', letterSpacing: '1px' }}>Financial breakdown per user</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '32px' }}>
                <div style={cardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                        <BarChart3 color="#8b5cf6" size={20} />
                        <h3 style={{ fontWeight: 'bold', margin: 0 }}>Top Consumers</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {data.slice(0, 5).map((u, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <div>
                                        <p style={{ fontWeight: 'bold', fontSize: '14px', margin: 0 }}>{u.name}</p>
                                        <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>{u.email}</p>
                                    </div>
                                    <p style={{ fontSize: '12px', color: '#8b5cf6', fontFamily: 'monospace', margin: 0 }}>{u.totalTokens.toLocaleString()} tokens</p>
                                </div>
                                <div style={{ width: '100%', height: '6px', backgroundColor: '#0b0b0b', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', backgroundColor: '#8b5cf6', width: `${Math.min(100, (u.totalTokens / (data[0]?.totalTokens || 1)) * 100)}%`, transition: 'width 1s ease' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={cardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                        <TrendingUp color="#eab308" size={20} />
                        <h3 style={{ fontWeight: 'bold', margin: 0 }}>Estimated Spend</h3>
                    </div>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '0 16px' }}>
                        {data.slice(0, 8).map((u, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                <div style={{ 
                                    width: '100%', 
                                    backgroundColor: 'rgba(234,179,8,0.2)', 
                                    borderTop: '2px solid #eab308', 
                                    borderRadius: '4px 4px 0 0',
                                    height: `${Math.min(100, (u.estimatedCost / (data[0]?.estimatedCost || 1)) * 100)}%`,
                                    transition: 'height 1s ease'
                                }} />
                                <span style={{ fontSize: '8px', color: '#4b5563', fontWeight: 'bold', textTransform: 'uppercase' }}>{u.name.split(' ')[0]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ ...cardStyle, marginTop: '32px', overflow: 'hidden', padding: 0 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#1a1a1a', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6b7280', textAlign: 'left' }}>
                        <tr>
                            <th style={{ padding: '24px 32px' }}>User</th>
                            <th style={{ padding: '24px 32px' }}>Messages</th>
                            <th style={{ padding: '24px 32px' }}>Tokens</th>
                            <th style={{ padding: '24px 32px', textAlign: 'right' }}>Cost</th>
                        </tr>
                    </thead>
                    <tbody style={{ color: '#9ca3af' }}>
                        {data.map((u, i) => (
                            <tr key={i} style={{ borderTop: '1px solid #262626' }}>
                                <td style={{ padding: '20px 32px' }}>
                                    <p style={{ fontWeight: 'bold', color: 'white', margin: 0 }}>{u.name}</p>
                                    <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>{u.email}</p>
                                </td>
                                <td style={{ padding: '20px 32px' }}>{u.messageCount}</td>
                                <td style={{ padding: '20px 32px', color: '#8b5cf6', fontFamily: 'monospace' }}>{u.totalTokens.toLocaleString()}</td>
                                <td style={{ padding: '20px 32px', textAlign: 'right', color: '#eab308', fontWeight: 'bold' }}>${u.estimatedCost.toFixed(4)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Analytics
