import React, { useState, useEffect, useRef } from 'react'
import { MoreVertical, Paperclip, Send, User, ChevronLeft, Copy, Check } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { sendMessage as sendMessageApi, sendGroupMessage as sendGroupMessageApi, getChatHistory, generateImage as generateImageApi, analyzeFile as analyzeFileApi, addBookmark as addBookmarkApi } from '../lib/api'
import { Image, Sparkles, Bookmark } from 'lucide-react'

const ChatContainer = ({ selectedUser, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [persona, setPersona] = useState('Architect');
    const [isGroupMode, setIsGroupMode] = useState(false);
    const [copiedId, setCopiedId] = useState(null);
    const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
    const messagesEndRef = useRef(null);

    const personas = ['Architect', 'Creative', 'Analyst', 'Coach'];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        const fetchHistory = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && selectedUser?.id === 1) { // Assuming id:1 is the main AI assistant for now
                try {
                    const { data } = await getChatHistory(user.id);
                    if (data.length > 0) setMessages(data);
                    else setMessages(selectedUser?.messages || []);
                } catch (err) {
                    setMessages(selectedUser?.messages || []);
                }
            } else {
                setMessages(selectedUser?.messages || []);
            }
        };
        fetchHistory();
    }, [selectedUser]);

     const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const user = JSON.parse(localStorage.getItem('user'));
        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: inputText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        try {
            if (isGroupMode) {
                const { data } = await sendGroupMessageApi({ userId: user.id, text: inputText });
                const newBotMsgs = data.botMessages.map(m => ({
                    ...m,
                    timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }));
                setMessages(prev => [...prev, ...newBotMsgs]);
            } else if (inputText.startsWith('/image ')) {
                const prompt = inputText.replace('/image ', '');
                const { data } = await generateImageApi({ userId: user.id, prompt });
                setMessages(prev => [...prev, { ...data.botMsg, timestamp: new Date(data.botMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
            } else {
                const { data } = await sendMessageApi({ userId: user.id, text: inputText, persona });
                setMessages(prev => [...prev, { ...data.botMsg, timestamp: new Date(data.botMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
            }
        } catch (err) {
            const errorMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: "I'm sorry, I'm having trouble connecting to my brain right now. Please check your API key in the backend .env file.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsTyping(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: `📁 Uploaded file: **${file.name}**\n*Analyzing content...*`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg]);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('prompt', "Please summarize this document.");

        try {
            const { data } = await analyzeFileApi(formData);
            const botMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: `### Document Summary: ${data.fileName}\n\n${data.analysis}`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (err) {
            alert('Failed to analyze document');
        } finally {
            setIsTyping(false);
        }
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleBookmark = async (msg) => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            await addBookmarkApi({ 
                userId: user.id, 
                title: msg.text.substring(0, 40) + '...', 
                text: msg.text 
            });
            setBookmarkedIds(prev => new Set([...prev, msg.id]));
        } catch (err) {
            alert('Failed to save bookmark');
        }
    };

    const clearChat = () => {
        if (window.confirm('Are you sure you want to clear this conversation?')) {
            setMessages([]);
        }
    };

    return (
        <div className='flex-1 flex flex-col bg-[#0b0b0b] relative h-full'>
            {/* Chat Header */}
            <div className='p-6 border-b border-[#1a1a1a] flex justify-between items-center bg-[#0b0b0b]/80 backdrop-blur-xl sticky top-0 z-10'>
                <div className='flex items-center gap-4'>
                    <button onClick={onBack} className='md:hidden p-2 hover:bg-[#1a1a1a] rounded-xl transition-colors'>
                        <ChevronLeft className='size-6 text-gray-500' />
                    </button>
                    <div className='w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20'>
                        {selectedUser?.avatar ? (
                            <img src={selectedUser.avatar} className='size-10 rounded-xl' alt="Avatar" />
                        ) : (
                            <User className='text-green-500 size-6' />
                        )}
                    </div>
                     <div>
                        <h2 className='text-lg font-bold'>{selectedUser?.name || 'ChatBot AI'}</h2>
                        <select 
                            value={persona}
                            onChange={(e) => setPersona(e.target.value)}
                            className='bg-transparent text-[10px] text-green-500 font-bold uppercase tracking-wider outline-none cursor-pointer hover:text-green-400'
                        >
                             {personas.map(p => <option key={p} value={p} className='bg-[#0b0b0b] text-white'>{p} Mode</option>)}
                        </select>
                    </div>
                </div>
                
                <div className='flex items-center gap-4'>
                    <button 
                        onClick={() => setIsGroupMode(!isGroupMode)}
                        className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-[10px] font-bold uppercase tracking-wider
                            ${isGroupMode 
                                ? 'bg-violet-500/10 border-violet-500/50 text-violet-500' 
                                : 'bg-[#171717] border-[#262626] text-gray-500 hover:border-gray-600'}`}
                    >
                        <div className={`size-2 rounded-full ${isGroupMode ? 'bg-violet-500 animate-pulse' : 'bg-gray-600'}`} />
                        Group Brainstorming
                    </button>

                    <button 
                        onClick={onBack}
                        className='p-3 bg-[#171717] border border-[#262626] rounded-2xl hover:bg-[#262626] transition-all text-gray-500'
                    >
                        <MoreVertical className='size-5' />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className='flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 flex flex-col'>
                 {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] group flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`
                                p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm relative
                                ${msg.sender === 'user' 
                                    ? 'bg-green-600 text-white rounded-tr-none' 
                                    : 'bg-[#171717] border border-[#262626] text-gray-100 rounded-tl-none'}
                            `}>
                                <div className='markdown-container overflow-x-auto'>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {msg.text}
                                    </ReactMarkdown>
                                </div>
                                
                                {msg.sender === 'bot' && (
                                    <div className='absolute -right-20 top-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                                        <button 
                                            onClick={() => copyToClipboard(msg.text, msg.id)}
                                            className='p-2 hover:bg-[#1a1a1a] rounded-lg'
                                            title="Copy to Clipboard"
                                        >
                                            {copiedId === msg.id ? (
                                                <Check className='size-4 text-green-500' />
                                            ) : (
                                                <Copy className='size-4 text-gray-500' />
                                            )}
                                        </button>
                                        <button 
                                            onClick={() => handleBookmark(msg)}
                                            className='p-2 hover:bg-[#1a1a1a] rounded-lg'
                                            title="Save to Bookmarks"
                                        >
                                            <Bookmark className={`size-4 ${bookmarkedIds.has(msg.id) ? 'text-green-500 fill-green-500' : 'text-gray-500'}`} />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className='flex items-center gap-2 mt-2 px-1'>
                                <span className='text-[10px] text-gray-600 font-medium uppercase'>{msg.timestamp}</span>
                            </div>
                        </div>
                    </div>
                ))}

                <div ref={messagesEndRef} />

                {isTyping && (
                    <div className='flex justify-start'>
                        <div className='bg-[#171717] border border-[#262626] p-4 rounded-2xl rounded-tl-none flex gap-1.5'>
                            <div className='w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce delay-0' />
                            <div className='w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce delay-150' />
                            <div className='w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce delay-300' />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className='p-6 pt-0'>
                <div className='bg-[#171717] border border-[#262626] rounded-2xl p-2 flex items-center gap-2 shadow-2xl focus-within:border-green-500/50 transition-all'>
                    <button 
                        onClick={() => document.getElementById('fileInput').click()}
                        className='p-3 hover:bg-[#262626] rounded-xl transition-colors'
                        title="Attach File"
                    >
                        <Paperclip className='size-5 text-gray-500' />
                        <input 
                            id="fileInput" 
                            type="file" 
                            className='hidden' 
                            accept=".pdf,.txt"
                            onChange={handleFileUpload}
                        />
                    </button>

                    <button 
                        onClick={() => setInputText('/image ')}
                        className='p-3 hover:bg-[#262626] rounded-xl transition-colors group'
                        title="Generate AI Image"
                    >
                        <Image className='size-5 text-gray-500 group-hover:text-blue-500' />
                    </button>
                    <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className='flex-1 bg-transparent border-none outline-none text-sm py-2 text-white placeholder-gray-600'
                    />
                    <button 
                        onClick={handleSendMessage}
                        className='p-3 bg-green-500 hover:bg-green-600 text-black rounded-xl transition-all shadow-lg shadow-green-500/20 active:scale-95'
                    >
                        <Send className='size-5' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatContainer
