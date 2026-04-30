import React, { useState, useRef, useEffect } from 'react'
import { Send, MoreVertical, Search, Paperclip, Smile, Mic, CheckCheck, ArrowLeft, Trash2, FileText, X } from 'lucide-react'
import { analyzeFile } from '../lib/api'
import EmojiPicker from 'emoji-picker-react'

const ChatContainer = ({ selectedUser, onSendMessage, loading, onBack, onClearChat }) => {
    const [input, setInput] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    
    // Search feature state
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Emoji picker state
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    
    // Voice recording state
    const [isRecording, setIsRecording] = useState(false);
    const [recognition, setRecognition] = useState(null);

    const scrollRef = useRef();
    const fileInputRef = useRef();
    const messages = selectedUser?.messages || [];

    useEffect(() => {
        // Initialize SpeechRecognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recog = new SpeechRecognition();
            recog.continuous = false;
            recog.interimResults = true;
            recog.lang = 'en-US';

            recog.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                
                setInput(transcript);
            };

            recog.onend = () => {
                setIsRecording(false);
            };

            setRecognition(recog);
        }
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isSearching]);

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleSend = (e) => {
        e?.preventDefault();
        if (input.trim() && !loading) {
            onSendMessage(input);
            setInput('');
            setShowEmojiPicker(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', JSON.parse(localStorage.getItem('user')).id);

        alert(`Uploading ${file.name} for analysis...`);
        try {
            const { data } = await analyzeFile(formData);
            onSendMessage(`Analyzing file: ${file.name}. \n\nSummary: ${data.analysis}`);
        } catch (err) {
            alert('File analysis failed. Ensure the backend file service is active.');
        }
    };

    const handleMicClick = () => {
        if (!recognition) {
            alert('Voice recording is not supported in this browser.');
            return;
        }

        if (isRecording) {
            recognition.stop();
            setIsRecording(false);
        } else {
            setInput('');
            recognition.start();
            setIsRecording(true);
        }
    };

    const onEmojiClick = (emojiObject) => {
        setInput(prev => prev + emojiObject.emoji);
    };

    const filteredMessages = isSearching && searchQuery.trim() 
        ? messages.filter(m => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
        : messages;

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#0b141a', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundBlendMode: 'overlay', pointerEvents: 'none' }} />

            {/* Header */}
            <header style={{ height: '60px', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#202c33', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <button onClick={onBack} className="md:hidden border-none bg-transparent text-[#aebac1] hover:text-white transition-colors cursor-pointer">
                        <ArrowLeft size={24} />
                    </button>
                    
                    {!isSearching ? (
                        <>
                            <img src={selectedUser?.avatar} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#111b21' }} alt="" />
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#e9edef', margin: 0 }}>{selectedUser?.name}</h3>
                                <p style={{ fontSize: '12px', color: '#00a884', margin: 0 }}>active session</p>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center bg-[#2a3942] rounded-xl px-3 py-1 mr-4 transition-all">
                            <input 
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search messages..."
                                className="bg-transparent border-none outline-none text-[#d1d7db] text-sm w-full py-1"
                            />
                            <X size={18} className="text-[#aebac1] cursor-pointer hover:text-white ml-2" onClick={() => { setIsSearching(false); setSearchQuery(''); }} />
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '24px', color: '#aebac1', position: 'relative' }}>
                    {!isSearching && <Search size={20} style={{ cursor: 'pointer' }} onClick={() => setIsSearching(true)} className="hover:text-white transition-colors" />}
                    <div style={{ position: 'relative' }}>
                        <MoreVertical size={20} style={{ cursor: 'pointer' }} onClick={() => setShowMenu(!showMenu)} className="hover:text-white transition-colors" />
                        {showMenu && (
                            <div style={{ position: 'absolute', top: '30px', right: 0, width: '180px', backgroundColor: '#233138', borderRadius: '8px', padding: '8px 0', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', zIndex: 50 }}>
                                <div onClick={() => { onClearChat(); setShowMenu(false); }} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: '#e9edef', fontSize: '14px' }} className="hover:bg-[#111b21] transition-colors">
                                    <Trash2 size={16} color="#ef4444" /> Clear Chat
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Message Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 80px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 5 }}>
                {filteredMessages.length === 0 && isSearching && (
                    <div className="flex justify-center my-4 text-[#8696a0] text-sm">No messages found for "{searchQuery}"</div>
                )}
                {filteredMessages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div style={{
                            position: 'relative',
                            padding: '10px 16px 20px 16px',
                            borderRadius: '12px',
                            maxWidth: '70%',
                            minWidth: '100px',
                            fontSize: '15px',
                            backgroundColor: msg.sender === 'user' ? '#005c4b' : '#202c33',
                            color: '#e9edef',
                            wordBreak: 'break-word'
                        }}>
                            <p style={{ margin: 0, paddingRight: '20px', lineHeight: '1.5' }}>
                                {isSearching && searchQuery ? (
                                    <span>
                                        {msg.text.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, index) => 
                                            part.toLowerCase() === searchQuery.toLowerCase() 
                                                ? <span key={index} className="bg-[#00a884] text-black font-bold">{part}</span> 
                                                : part
                                        )}
                                    </span>
                                ) : (
                                    msg.text
                                )}
                            </p>
                            <div style={{ position: 'absolute', bottom: '4px', right: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: 'bold' }}>{formatTime(msg.timestamp)}</span>
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

            {/* Footer */}
            <footer style={{ padding: '10px 16px', backgroundColor: '#202c33', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10, position: 'relative' }}>
                
                {showEmojiPicker && (
                    <div style={{ position: 'absolute', bottom: '70px', left: '16px', zIndex: 50 }}>
                        <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
                    </div>
                )}

                <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleFileUpload}
                    accept=".pdf,.txt,.docx"
                />
                <div style={{ display: 'flex', gap: '16px', color: '#aebac1' }}>
                    <Smile size={24} style={{ cursor: 'pointer' }} onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`transition-colors ${showEmojiPicker ? 'text-[#00a884]' : 'hover:text-white'}`} />
                    <Paperclip size={24} style={{ cursor: 'pointer' }} onClick={() => fileInputRef.current.click()} className="hover:text-white transition-colors" />
                </div>
                <form onSubmit={handleSend} style={{ flex: 1 }}>
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isRecording ? "Listening..." : "Type a message"}
                        style={{ width: '100%', backgroundColor: '#2a3942', border: 'none', outline: 'none', padding: '12px 16px', borderRadius: '12px', color: '#d1d7db', fontSize: '15px' }}
                    />
                </form>
                <div style={{ color: '#aebac1' }}>
                    {input.trim() ? (
                        <button onClick={handleSend} className="border-none bg-transparent transition-colors flex items-center justify-center text-[#00a884] hover:text-[#00c298] cursor-pointer">
                            <Send size={24} />
                        </button>
                    ) : (
                        <Mic size={24} style={{ cursor: 'pointer' }} onClick={handleMicClick} className={`transition-all ${isRecording ? 'text-red-500 animate-pulse scale-110' : 'hover:text-white'}`} />
                    )}
                </div>
            </footer>
        </div>
    )
}

export default ChatContainer