import React from 'react'
import { Search, MessageSquare, MoreVertical } from 'lucide-react'
import { Users } from '../lib/data'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const History = () => {
    const navigate = useNavigate();
    const tabs = ["All", "Today", "Yesterday", "Last 7 Days"]
    
    return (
        <div className='flex-1 bg-[#0b0b0b] p-8 overflow-y-auto custom-scrollbar'>
            <header className='flex justify-between items-center mb-10'>
                <div className='flex items-center gap-4'>
                    <div className='w-10 h-10 bg-green-500 rounded-xl overflow-hidden'>
                        <img src={assets.logo} alt="Logo" className='w-full h-full object-cover' />
                    </div>
                    <h1 className='text-2xl font-bold'>History</h1>
                </div>
                <button className='p-3 bg-[#171717] rounded-2xl border border-[#262626]'>
                    <Search className='size-5 text-gray-500' />
                </button>
            </header>

            <div className='flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide'>
                {tabs.map((tab, i) => (
                    <button 
                        key={i}
                        className={`px-6 py-3 rounded-2xl text-xs font-bold border transition-all whitespace-nowrap
                            ${i === 0 
                                ? 'bg-green-500/10 border-green-500/50 text-green-500' 
                                : 'bg-[#171717] border-[#262626] text-gray-500 hover:border-gray-600'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className='space-y-8'>
                <section>
                    <h3 className='text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-6 px-2'>Today</h3>
                    <div className='space-y-3'>
                        {Users.slice(0, 2).map((chat) => (
                            <div 
                                key={chat.id} 
                                onClick={() => navigate('/')}
                                className='bg-[#171717] border border-[#262626] p-5 rounded-[32px] flex items-center gap-4 group hover:bg-[#1a1a1a] transition-all cursor-pointer'
                            >
                                <div className='w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20'>
                                    <MessageSquare className='size-6 text-green-500' />
                                </div>
                                <div className='flex-1'>
                                    <h4 className='text-sm font-bold'>{chat.lastMessage}</h4>
                                    <p className='text-[10px] text-gray-500 mt-1'>{chat.timestamp} • {chat.name}</p>
                                </div>
                                <button className='p-2 hover:bg-[#262626] rounded-xl'>
                                    <MoreVertical className='size-5 text-gray-500' />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className='text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-6 px-2'>Yesterday</h3>
                    <div className='space-y-3'>
                        {Users.slice(2, 4).map((chat) => (
                            <div 
                                key={chat.id} 
                                onClick={() => navigate('/')}
                                className='bg-[#171717] border border-[#262626] p-5 rounded-[32px] flex items-center gap-4 group hover:bg-[#1a1a1a] transition-all cursor-pointer'
                            >
                                <div className='w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20'>
                                    <MessageSquare className='size-6 text-green-500' />
                                </div>
                                <div className='flex-1'>
                                    <h4 className='text-sm font-bold'>{chat.lastMessage}</h4>
                                    <p className='text-[10px] text-gray-500 mt-1'>{chat.timestamp} • {chat.name}</p>
                                </div>
                                <button className='p-2 hover:bg-[#262626] rounded-xl'>
                                    <MoreVertical className='size-5 text-gray-500' />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default History

