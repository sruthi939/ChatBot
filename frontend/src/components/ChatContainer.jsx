import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, Paperclip, Mic, MoreVertical } from 'lucide-react'

const ChatContainer = ({ messages, onSendMessage, loading }) => {
    const [input, setInput] = useState('');
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim() && !loading) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#050505] relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Header */}
            <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-black/20 backdrop-blur-xl z-10">
                <div className="flex items-center gap-4">
                    <div className="size-10 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                        <Bot className="text-black" size={22} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight">Neural Core v1.0</h2>
                        <div className="flex items-center gap-1.5">
                            <div className="size-1.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Processing</span>
                        </div>
                    </div>
                </div>
                <button className="p-3 hover:bg-white/5 rounded-xl transition-all text-gray-500">
                    <MoreVertical size={20} />
                </button>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-10 space-y-8 custom-scrollbar">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                        <div className={`flex gap-4 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`size-10 rounded-xl flex-shrink-0 flex items-center justify-center border ${msg.sender === 'user' ? 'bg-white/5 border-white/10' : 'bg-green-500/10 border-green-500/20'}`}>
                                {msg.sender === 'user' ? <User size={18} className="text-gray-400" /> : <Sparkles size={18} className="text-green-500" />}
                            </div>
                            <div className={`p-5 rounded-3xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-white/5 border border-white/10 text-white rounded-tr-none' : 'bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/5 text-gray-300 rounded-tl-none shadow-xl'}`}>
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start animate-pulse">
                        <div className="flex gap-4 max-w-[80%]">
                            <div className="size-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                <Sparkles size={18} className="text-green-500" />
                            </div>
                            <div className="p-5 bg-white/5 border border-white/5 rounded-3xl rounded-tl-none flex gap-1.5">
                                <div className="size-1.5 bg-green-500/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                <div className="size-1.5 bg-green-500/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                <div className="size-1.5 bg-green-500/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div className="p-8 bg-gradient-to-t from-black to-transparent z-10">
                <form onSubmit={handleSend} className="max-w-4xl mx-auto relative group">
                    <div className="absolute inset-0 bg-green-500/5 blur-2xl rounded-[32px] opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative flex items-center bg-[#111] border border-white/10 rounded-[32px] p-2 pr-4 shadow-2xl transition-all focus-within:border-green-500/30">
                        <button type="button" className="p-4 hover:bg-white/5 rounded-2xl transition-all text-gray-500">
                            <Paperclip size={20} />
                        </button>
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a command or message..."
                            className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-white text-md placeholder:text-gray-600"
                        />
                        <button type="button" className="p-4 hover:bg-white/5 rounded-2xl transition-all text-gray-500 mr-2">
                            <Mic size={20} />
                        </button>
                        <button 
                            type="submit" 
                            disabled={!input.trim() || loading}
                            className="size-12 bg-green-500 hover:bg-green-400 disabled:bg-white/5 disabled:text-gray-600 text-black rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-green-500/20 active:scale-95"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </form>
                <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-6">
                    Powered by Neural Core Engine • High Priority Protocol
                </p>
            </div>
        </div>
    )
}

export default ChatContainer