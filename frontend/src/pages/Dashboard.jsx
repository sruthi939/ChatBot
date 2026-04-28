import React from 'react'
import { MessageSquare, Zap, TrendingUp, ChevronRight, MoreVertical } from 'lucide-react'
import { Users } from '../lib/data'

const Dashboard = () => {
    const features = [
        { title: 'Smart Conversations', desc: 'Chat with our AI assistant on anything.', icon: <MessageSquare className='text-violet-500' />, bg: 'bg-violet-500/10' },
        { title: 'Quick Answers', desc: 'Get instant answers to your questions.', icon: <Zap className='text-green-500' />, bg: 'bg-green-500/10' },
        { title: 'Boost Productivity', desc: 'Tips and help to stay productive.', icon: <TrendingUp className='text-blue-500' />, bg: 'bg-blue-500/10' },
    ]

    return (
        <div className='flex-1 bg-[#0b0b0b] overflow-y-auto custom-scrollbar p-10'>
            <header className='mb-12'>
                <h1 className='text-3xl font-bold mb-2'>Welcome back, John! 👋</h1>
                <p className='text-gray-500'>What would you like to explore today?</p>
            </header>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
                {features.map((f, i) => (
                    <div key={i} className='bg-[#171717] border border-[#262626] p-6 rounded-3xl hover:border-green-500/30 transition-all cursor-pointer group'>
                        <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            {f.icon}
                        </div>
                        <h3 className='font-bold mb-2'>{f.title}</h3>
                        <p className='text-xs text-gray-500 leading-relaxed'>{f.desc}</p>
                    </div>
                ))}
            </div>

            <section>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-lg font-bold'>Recent Chats</h2>
                    <button className='text-green-500 text-xs font-bold hover:underline flex items-center gap-1'>
                        View all <ChevronRight className='size-3' />
                    </button>
                </div>
                <div className='space-y-3'>
                    {Users.slice(0, 4).map((user) => (
                        <div key={user.id} className='bg-[#171717] border border-[#262626] p-4 rounded-2xl flex items-center gap-4 group hover:bg-[#1a1a1a] transition-all cursor-pointer'>
                            <div className='w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20'>
                                <MessageSquare className='size-5 text-green-500' />
                            </div>
                            <div className='flex-1'>
                                <h4 className='text-sm font-bold group-hover:text-green-500 transition-colors'>{user.lastMessage}</h4>
                                <p className='text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-medium'>{user.timestamp}</p>
                            </div>
                            <button className='p-2 hover:bg-[#262626] rounded-xl transition-colors'>
                                <MoreVertical className='size-4 text-gray-500' />
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Dashboard
