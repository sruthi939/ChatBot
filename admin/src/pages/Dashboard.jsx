import React from 'react'
import { Users, Activity, Zap, DollarSign } from 'lucide-react'

const Dashboard = ({ stats }) => {
    // Failsafe mappings to match real backend responses
    const userCount = stats.totalUsers || 0;
    const messageCount = stats.totalMessages || 0;
    const tokenUsage = stats.estimatedTokens || 0;
    const cost = stats.estimatedCost || 0;

    const cardContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '32px',
        marginTop: '32px'
    };

    const cardStyle = {
        backgroundColor: '#171717',
        border: '1px solid #262626',
        borderRadius: '32px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    };

    const iconBoxStyle = (color) => ({
        padding: '12px',
        backgroundColor: `${color}10`,
        borderRadius: '16px',
        width: 'fit-content'
    });

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            
            <div>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>Overview</h1>
                <p style={{ color: '#6b7280', fontSize: '12px', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '4px', letterSpacing: '1px' }}>Real-time system performance</p>
            </div>

            <div style={cardContainerStyle}>
                {/* Users */}
                <div style={cardStyle}>
                    <div style={iconBoxStyle('#3b82f6')}>
                        <Users size={24} color="#3b82f6" />
                    </div>
                    <div>
                        <p style={{ color: '#6b7280', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', margin: 0 }}>Total Users</p>
                        <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: '4px 0' }}>{userCount}</h2>
                    </div>
                </div>

                {/* Activity */}
                <div style={cardStyle}>
                    <div style={iconBoxStyle('#ef4444')}>
                        <Activity size={24} color="#ef4444" />
                    </div>
                    <div>
                        <p style={{ color: '#6b7280', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', margin: 0 }}>Total Activity</p>
                        <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: '4px 0' }}>{messageCount}</h2>
                    </div>
                </div>

                {/* Tokens */}
                <div style={cardStyle}>
                    <div style={iconBoxStyle('#8b5cf6')}>
                        <Zap size={24} color="#8b5cf6" />
                    </div>
                    <div>
                        <p style={{ color: '#6b7280', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', margin: 0 }}>Token Usage</p>
                        <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: '4px 0' }}>{tokenUsage.toLocaleString()}</h2>
                    </div>
                </div>

                {/* Spend */}
                <div style={cardStyle}>
                    <div style={iconBoxStyle('#eab308')}>
                        <DollarSign size={24} color="#eab308" />
                    </div>
                    <div>
                        <p style={{ color: '#6b7280', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', margin: 0 }}>API Spend</p>
                        <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: '4px 0' }}>${cost}</h2>
                    </div>
                </div>
            </div>

            <div style={{ ...cardStyle, marginTop: '32px', backgroundColor: 'rgba(34,197,94,0.05)', borderColor: 'rgba(34,197,94,0.1)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#22c55e', margin: '0 0 8px 0' }}>Pro Tip: Monitor Token Usage</h3>
                <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6', margin: 0 }}>
                    Your current estimated cost is based on real-time token tracking from OpenAI. Keep an eye on the "API Spend" to manage your budget effectively.
                </p>
            </div>
        </div>
    )
}

export default Dashboard
