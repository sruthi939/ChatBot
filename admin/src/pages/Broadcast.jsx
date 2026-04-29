import React, { useState } from 'react'
import { Megaphone, Send, Info } from 'lucide-react'

const Broadcast = ({ onSend }) => {
    const [msg, setMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSend(msg);
        setMsg('');
    }

    const cardStyle = {
        backgroundColor: '#171717',
        border: '1px solid #262626',
        borderRadius: '32px',
        padding: '40px',
        marginTop: '32px'
    };

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
            
            <div>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>System Broadcast</h1>
                <p style={{ color: '#6b7280', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '4px', letterSpacing: '1px' }}>Send announcements to all users</p>
            </div>

            <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', backgroundColor: 'rgba(59,130,246,0.1)', borderRadius: '16px', color: '#60a5fa', fontSize: '14px', marginBottom: '32px', border: '1px solid rgba(59,130,246,0.2)' }}>
                    <Info size={20} />
                    <p style={{ margin: 0 }}>Broadcast messages will be sent to the global notification system and displayed to all active users.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <textarea 
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder='Type your global announcement here...'
                        style={{
                            width: '100%',
                            backgroundColor: '#0b0b0b',
                            border: '1px solid #262626',
                            borderRadius: '24px',
                            padding: '24px',
                            minHeight: '200px',
                            outline: 'none',
                            color: 'white',
                            fontSize: '18px',
                            resize: 'none',
                            fontFamily: 'inherit',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(239,68,68,0.5)'}
                        onBlur={(e) => e.target.style.borderColor = '#262626'}
                        required
                    />
                    <button 
                        type='submit'
                        style={{
                            marginTop: '24px',
                            padding: '20px 48px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: '16px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            transition: 'all 0.2s',
                            boxShadow: '0 10px 20px rgba(239,68,68,0.2)'
                        }}
                    >
                        <Send size={20} />
                        Broadcast Now
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Broadcast
