import React from 'react'
import { MoreVertical, Paperclip, Send, User } from 'lucide-react'
import { Messages } from '../lib/data'

const ChatContainer = ({ selectedUser }) => {
    return (
        <div className='flex-1 flex flex-col bg-[#0b0b0b] relative h-full'>
            {/* Chat Header */}
            <div className='p-6 border-b border-[#1a1a1a] flex justify-between items-center bg-[#0b0b0b]/80 backdrop-blur-xl sticky top-0 z-10'>
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20'>
                        <User className='text-green-500 size-6' />
                    </div>
                    <div>
                        <h2 className='text-lg font-bold'>ChatBot AI</h2>
                        <div className='flex items-center gap-1.5'>
                            <div className='w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse' />
                            <span className='text-[10px] text-green-500 font-medium tracking-wide uppercase'>Online</span>
                        </div>
                    </div>
                </div>
                <button className='p-2 hover:bg-[#1a1a1a] rounded-xl transition-colors'>
                    <MoreVertical className='size-5 text-gray-500' />
                </button>
            </div>

            {/* Messages Area */}
            <div className='flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6'>
                {Messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] group flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`
                                p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm
                                ${msg.sender === 'user' 
                                    ? 'bg-green-600 text-white rounded-tr-none' 
                                    : 'bg-[#171717] border border-[#262626] text-gray-100 rounded-tl-none'}
                            `}>
                                <div className='whitespace-pre-wrap'>{msg.text}</div>
                            </div>
                            <div className='flex items-center gap-2 mt-2 px-1'>
                                <span className='text-[10px] text-gray-600 font-medium uppercase'>{msg.timestamp}</span>
                                {msg.sender === 'user' && (
                                    <div className='flex items-center'>
                                        <div className='size-3 text-green-500'>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                        <div className='size-3 text-green-500 -ml-1.5'>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className='p-6 pt-0'>
                <div className='bg-[#171717] border border-[#262626] rounded-2xl p-2 flex items-center gap-2 shadow-2xl focus-within:border-green-500/50 transition-all'>
                    <button className='p-3 hover:bg-[#262626] rounded-xl transition-colors'>
                        <Paperclip className='size-5 text-gray-500' />
                    </button>
                    <input 
                        type="text" 
                        placeholder="Type a message..."
                        className='flex-1 bg-transparent border-none outline-none text-sm py-2 text-white placeholder-gray-600'
                    />
                    <button className='p-3 bg-green-500 hover:bg-green-600 text-black rounded-xl transition-all shadow-lg shadow-green-500/20 active:scale-95'>
                        <Send className='size-5' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatContainer