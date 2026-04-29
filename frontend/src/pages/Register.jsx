import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Lock, Shield } from 'lucide-react'

const Register = ({ onLogin }) => {
    const [creds, setCreds] = useState({ name: '', email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();
    };

    const pageStyle = {
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0b141a',
        fontFamily: 'sans-serif',
        padding: '20px'
    };

    const cardStyle = {
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#111b21',
        borderRadius: '32px',
        padding: '48px',
        border: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
    };

    const inputContainer = {
        position: 'relative',
        marginBottom: '20px'
    };

    const inputStyle = {
        width: '100%',
        backgroundColor: '#2a3942',
        border: '1px solid transparent',
        borderRadius: '16px',
        padding: '16px 16px 16px 52px',
        color: 'white',
        fontSize: '15px',
        outline: 'none',
        transition: 'all 0.2s'
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <div style={{ display: 'inline-flex', padding: '16px', backgroundColor: 'rgba(0,168,132,0.1)', borderRadius: '24px', marginBottom: '32px' }}>
                    <Shield size={40} color="#00a884" />
                </div>

                <h1 style={{ color: '#e9edef', fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Join Us</h1>
                <p style={{ color: '#8696a0', fontSize: '14px', marginBottom: '40px' }}>Create your account to start secure AI messaging</p>

                <form onSubmit={handleSubmit}>
                    <div style={inputContainer}>
                        <User style={{ position: 'absolute', left: '18px', top: '18px', color: '#8696a0' }} size={20} />
                        <input 
                            type="text" 
                            placeholder="Full name"
                            required
                            style={inputStyle}
                            value={creds.name}
                            onChange={(e) => setCreds({...creds, name: e.target.value})}
                            onFocus={(e) => e.target.style.borderColor = '#00a884'}
                            onBlur={(e) => e.target.style.borderColor = 'transparent'}
                        />
                    </div>

                    <div style={inputContainer}>
                        <Mail style={{ position: 'absolute', left: '18px', top: '18px', color: '#8696a0' }} size={20} />
                        <input 
                            type="email" 
                            placeholder="Email address"
                            required
                            style={inputStyle}
                            value={creds.email}
                            onChange={(e) => setCreds({...creds, email: e.target.value})}
                            onFocus={(e) => e.target.style.borderColor = '#00a884'}
                            onBlur={(e) => e.target.style.borderColor = 'transparent'}
                        />
                    </div>

                    <div style={inputContainer}>
                        <Lock style={{ position: 'absolute', left: '18px', top: '18px', color: '#8696a0' }} size={20} />
                        <input 
                            type="password" 
                            placeholder="Create password"
                            required
                            style={inputStyle}
                            value={creds.password}
                            onChange={(e) => setCreds({...creds, password: e.target.value})}
                            onFocus={(e) => e.target.style.borderColor = '#00a884'}
                            onBlur={(e) => e.target.style.borderColor = 'transparent'}
                        />
                    </div>

                    <button 
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '16px',
                            backgroundColor: '#00a884',
                            color: 'black',
                            fontWeight: 'bold',
                            borderRadius: '16px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            marginTop: '12px',
                            transition: 'transform 0.2s'
                        }}
                    >
                        Create Account
                    </button>
                </form>

                <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
                    <span style={{ fontSize: '12px', color: '#8696a0', fontWeight: 'bold', textTransform: 'uppercase' }}>Secure AI Gateway</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
                </div>

                <p style={{ marginTop: '40px', fontSize: '14px', color: '#8696a0' }}>
                    Already have an account? <Link to="/login" style={{ color: '#00a884', textDecoration: 'none', fontWeight: 'bold' }}>Sign In</Link>
                </p>
            </div>
        </div>
    )
}

export default Register
