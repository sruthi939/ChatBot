import React from 'react'
import { PlusCircle, Search, MessageSquare, ChevronRight } from 'lucide-react'
import { Suggestions } from '../lib/data'

const NewChatList = ({ onSelect }) => {
    return (
        <div className='flex-1 bg-[#0b0b0b] p-8 overflow-y-auto custom-scrollbar'>
            <header className='flex items-center gap-4 mb-10'>
                <h1 className='text-2xl font-bold'>New Chat</h1>
            </header>

            <div className='relative mb-10'>
                <Search className='absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-500' />
                <input 
                    type="text" 
                    placeholder="Search chats..."
                    className='w-full bg-[#171717] border border-[#262626] rounded-3xl py-5 pl-14 pr-5 outline-none focus:border-green-500/50 transition-all text-sm'
                />
            </div>

            <div className='space-y-4'>
                {Suggestions.map((text, i) => (
                    <div 
                        key={i} 
                        onClick={() => onSelect(text)}
                        className='bg-[#171717] border border-[#262626] p-5 rounded-3xl flex items-center gap-4 group hover:border-green-500/30 transition-all cursor-pointer active:scale-[0.98]'
                    >
                        <div className='w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform'>
                            <PlusCircle className='size-6 text-black' />
                        </div>
                        <span className='flex-1 text-sm font-medium'>{text}</span>
                        <ChevronRight className='size-5 text-gray-700 group-hover:text-green-500' />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewChatList
