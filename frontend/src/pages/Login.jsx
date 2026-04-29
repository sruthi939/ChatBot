import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Github, Globe, Smartphone } from 'lucide-react'

const Login = ({ onLogin }) => {
    const [showPass, setShowPass] = useState(false);
    const [creds, setCreds] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(creds);
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
                {/* Logo */}
                <div style={{ display: 'inline-flex', padding: '16px', backgroundColor: 'rgba(0,168,132,0.1)', borderRadius: '24px', marginBottom: '32px' }}>
                    <ShieldCheck size={40} color="#00a884" />
                </div>

                <h1 style={{ color: '#e9edef', fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Welcome Back</h1>
                <p style={{ color: '#8696a0', fontSize: '14px', marginBottom: '40px' }}>Sign in to continue your secure chat session</p>

                <form onSubmit={handleSubmit}>
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
                            type={showPass ? "text" : "password"} 
                            placeholder="Password"
                            required
                            style={inputStyle}
                            value={creds.password}
                            onChange={(e) => setCreds({...creds, password: e.target.value})}
                            onFocus={(e) => e.target.style.borderColor = '#00a884'}
                            onBlur={(e) => e.target.style.borderColor = 'transparent'}
                        />
                        <div 
                            onClick={() => setShowPass(!showPass)}
                            style={{ position: 'absolute', right: '18px', top: '18px', color: '#8696a0', cursor: 'pointer' }}
                        >
                            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                        </div>
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
                        Sign In
                    </button>
                </form>

                <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
                    <span style={{ fontSize: '12px', color: '#8696a0', fontWeight: 'bold', textTransform: 'uppercase' }}>or continue with</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
                    <div style={{ padding: '12px', backgroundColor: '#2a3942', borderRadius: '12px', cursor: 'pointer' }}><Globe size={20} color="#e9edef" /></div>
                    <div style={{ padding: '12px', backgroundColor: '#2a3942', borderRadius: '12px', cursor: 'pointer' }}><Smartphone size={20} color="#e9edef" /></div>
                    <div style={{ padding: '12px', backgroundColor: '#2a3942', borderRadius: '12px', cursor: 'pointer' }}><Github size={20} color="#e9edef" /></div>
                </div>

                <p style={{ marginTop: '40px', fontSize: '14px', color: '#8696a0' }}>
                    Don't have an account? <Link to="/signup" style={{ color: '#00a884', textDecoration: 'none', fontWeight: 'bold' }}>Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login