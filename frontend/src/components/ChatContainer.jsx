import React, { useState, useRef, useEffect } from 'react'
import { Send, MoreVertical, Search, Paperclip, Smile, Mic, CheckCheck, ArrowLeft } from 'lucide-react'

const ChatContainer = ({ selectedUser, onSendMessage, loading, onBack }) => {
    const [input, setInput] = useState('');
    const scrollRef = useRef();
    const messages = selectedUser?.messages || [];

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim() && !loading) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#0b141a', position: 'relative' }}>
            {/* Background Pattern */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundBlendMode: 'overlay', pointerEvents: 'none' }} />

            {/* Header */}
            <header style={{ height: '60px', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#202c33', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={onBack} style={{ display: 'none', border: 'none', background: 'none', color: '#aebac1' }}>
                        <ArrowLeft size={24} />
                    </button>
                    <img src={selectedUser?.avatar} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#111b21' }} alt="" />
                    <div style={{ cursor: 'pointer' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#e9edef', margin: 0 }}>{selectedUser?.name}</h3>
                        <p style={{ fontSize: '12px', color: '#8696a0', margin: 0 }}>online</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '24px', color: '#aebac1' }}>
                    <Search size={20} style={{ cursor: 'pointer' }} />
                    <MoreVertical size={20} style={{ cursor: 'pointer' }} />
                </div>
            </header>

            {/* Message Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 80px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 5 }}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div style={{
                            position: 'relative',
                            padding: '10px 16px 20px 16px',
                            borderRadius: '12px',
                            maxWidth: '70%',
                            minWidth: '100px',
                            fontSize: '15px',
                            boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
                            backgroundColor: msg.sender === 'user' ? '#005c4b' : '#202c33',
                            color: '#e9edef',
                            wordBreak: 'break-word'
                        }}>
                            <p style={{ margin: 0, paddingRight: '20px', lineHeight: '1.5' }}>{msg.text}</p>
                            <div style={{ position: 'absolute', bottom: '4px', right: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: 'bold' }}>
                                    {formatTime(msg.timestamp)}
                                </span>
                                {msg.sender === 'user' && <CheckCheck size={14} color="#53bdeb" />}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{ padding: '12px 16px', borderRadius: '12px', backgroundColor: '#202c33', display: 'flex', gap: '6px' }}>
                            <div className="animate-bounce" style={{ width: '6px', height: '6px', backgroundColor: '#8696a0', borderRadius: '50%' }} />
                            <div className="animate-bounce" style={{ width: '6px', height: '6px', backgroundColor: '#8696a0', borderRadius: '50%', animationDelay: '0.2s' }} />
                            <div className="animate-bounce" style={{ width: '6px', height: '6px', backgroundColor: '#8696a0', borderRadius: '50%', animationDelay: '0.4s' }} />
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input Footer */}
            <footer style={{ padding: '10px 16px', backgroundColor: '#202c33', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10 }}>
                <div style={{ display: 'flex', gap: '16px', color: '#aebac1' }}>
                    <Smile size={24} style={{ cursor: 'pointer' }} />
                    <Paperclip size={24} style={{ cursor: 'pointer' }} />
                </div>
                <form onSubmit={handleSend} style={{ flex: 1 }}>
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                        style={{
                            width: '100%',
                            backgroundColor: '#2a3942',
                            border: 'none',
                            outline: 'none',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            color: '#d1d7db',
                            fontSize: '15px'
                        }}
                    />
                </form>
                <div style={{ color: '#aebac1' }}>
                    {input.trim() ? (
                        <button onClick={handleSend} style={{ border: 'none', background: 'none', color: '#00a884', padding: '4px', cursor: 'pointer' }}>
                            <Send size={24} />
                        </button>
                    ) : (
                        <Mic size={24} style={{ cursor: 'pointer' }} />
                    )}
                </div>
            </footer>
        </div>
    )
}

export default ChatContainer