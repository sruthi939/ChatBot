import React, { useState } from 'react'
import { Lock, Mail, ShieldCheck, Zap } from 'lucide-react'

const Login = ({ onLogin, error }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(credentials);
    };

    const containerStyle = {
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0b0b0b',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'sans-serif'
    };

    const cardStyle = {
        backgroundColor: '#171717',
        border: '1px solid rgba(255,255,255,0.05)',
        padding: '60px 40px',
        borderRadius: '40px',
        width: '100%',
        maxWidth: '450px',
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
    };

    const inputWrapperStyle = {
        position: 'relative',
        marginBottom: '25px',
        textAlign: 'left'
    };

    const inputStyle = {
        width: '100%',
        backgroundColor: '#0b0b0b',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '18px 20px 18px 55px',
        borderRadius: '20px',
        outline: 'none',
        color: 'white',
        fontSize: '14px',
        boxSizing: 'border-box'
    };

    const iconStyle = {
        position: 'absolute',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#4b5563'
    };

    const buttonStyle = {
        width: '100%',
        backgroundColor: '#22c55e',
        color: 'black',
        fontWeight: '900',
        padding: '20px',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px',
        transition: 'all 0.2s'
    };

    return (
        <div style={containerStyle}>
            {/* Background Glows */}
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', backgroundColor: 'rgba(34,197,94,0.05)', filter: 'blur(100px)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', backgroundColor: 'rgba(34,197,94,0.03)', filter: 'blur(100px)', borderRadius: '50%' }} />

            <div style={cardStyle}>
                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'inline-block', padding: '15px', backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: '20px', marginBottom: '20px', border: '1px solid rgba(34,197,94,0.2)' }}>
                        <ShieldCheck size={40} color="#22c55e" />
                    </div>
                    <h1 style={{ fontSize: '32px', margin: '0 0 10px 0', fontWeight: '900', letterSpacing: '-1px' }}>Admin Console</h1>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '2px' }}>Authentication Required</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={inputWrapperStyle}>
                        <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: '#4b5563', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '5px' }}>Admin Identity</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={20} style={iconStyle} />
                            <input 
                                type="email" 
                                placeholder="admin@system.ai" 
                                required
                                style={inputStyle}
                                onChange={e => setCredentials({...credentials, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div style={inputWrapperStyle}>
                        <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: '#4b5563', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '5px' }}>Access Key</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={iconStyle} />
                            <input 
                                type="password" 
                                placeholder="••••••••••••" 
                                required
                                style={inputStyle}
                                onChange={e => setCredentials({...credentials, password: e.target.value})}
                            />
                        </div>
                    </div>

                    {error && (
                        <div style={{ padding: '15px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '15px', marginBottom: '20px' }}>
                            <p style={{ color: '#ef4444', fontSize: '12px', margin: 0, fontWeight: 'bold' }}>{error}</p>
                        </div>
                    )}

                    <button type="submit" style={buttonStyle}>
                        Authorize Session
                    </button>
                </form>

                <p style={{ marginTop: '40px', fontSize: '10px', color: '#374151', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Authorized Personnel Only
                </p>
            </div>
        </div>
    )
}

export default Login
