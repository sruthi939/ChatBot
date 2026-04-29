import React from 'react'
import { Home, SquarePlus, Clock, Bookmark, Settings, Crown, MoreVertical, MessageSquare } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, NavigationItems } from '../lib/data';
import { assets } from '../assets/assets';

const Sidebar = ({ selectedUser, setSelectedUser }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={`w-[280px] h-full flex flex-col bg-[#0b0b0b] border-r border-[#1a1a1a] text-white transition-all duration-300 ${selectedUser ? "max-md:hidden" : ""}`}>
            {/* Header / Logo */}
            <div className='p-6 flex items-center gap-3'>
                <div className='w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center overflow-hidden'>
                    <img src={assets.logo} alt="Logo" className='w-full h-full object-cover' />
                </div>
                <div>
                    <h2 className='text-lg font-bold tracking-tight'>ChatBot AI</h2>
                    <div className='flex items-center gap-1.5'>
                        <div className='w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse' />
                        <span className='text-[10px] text-green-500 font-medium'>Online</span>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className='px-4 mb-8'>
                <div className='flex flex-col gap-1'>
                    {NavigationItems.map((item) => {
                        const Icon = { Home, SquarePlus, Clock, Bookmark, Settings }[item.icon];
                        const isActive = location.pathname === `/${item.id}` || (item.id === 'home' && location.pathname === '/');
                        return (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.id === 'home' ? '/' : `/${item.id}`)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                                    ${isActive
                                        ? "bg-green-500/10 text-green-500"
                                        : "text-gray-500 hover:bg-[#1a1a1a] hover:text-white"}`}
                            >
                                <Icon className={`size-5 ${isActive ? "text-green-500" : "text-gray-500 group-hover:text-white"}`} />
                                <span className='text-sm font-medium'>{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Recent Chats Section */}
            <div className='px-4 flex-1 flex flex-col min-h-0'>
                <div className='px-4 mb-4 flex justify-between items-center'>
                    <span className='text-[10px] font-bold text-gray-600 uppercase tracking-widest'>Recent Chats</span>
                </div>
                <div className='flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1 pr-1'>
                    {Users.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 group
                                ${user.id === selectedUser?.id
                                    ? "bg-[#1a1a1a] border border-[#262626]"
                                    : "hover:bg-[#1a1a1a] border border-transparent"}`}
                        >
                            <div className='relative flex-shrink-0'>
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className='size-10 rounded-lg bg-[#1a1a1a]'
                                />
                                {user.status === 'online' && (
                                    <span className='absolute -bottom-0.5 -right-0.5 size-2.5 bg-green-500 border-2 border-[#0b0b0b] rounded-full' />
                                )}
                            </div>
                            <div className='flex-1 min-w-0'>
                                <div className='flex justify-between items-center mb-0.5'>
                                    <h3 className='font-semibold text-[13px] truncate'>{user.lastMessage}</h3>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-[10px] text-gray-500'>{user.timestamp}</span>
                                    {user.unreadCount > 0 && (
                                        <span className='bg-green-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-md'>
                                            {user.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Section */}
            <div className='p-4 space-y-4'>
                {/* Upgrade Pro Card */}
                <div 
                    onClick={() => alert('Pro features coming soon!')}
                    className='bg-gradient-to-br from-[#1a1a1a] to-[#0b0b0b] border border-[#262626] rounded-2xl p-4 relative overflow-hidden group cursor-pointer active:scale-95 transition-all'
                >
                    <div className='absolute -right-4 -top-4 w-16 h-16 bg-yellow-500/10 rounded-full blur-xl group-hover:bg-yellow-500/20 transition-all' />
                    <div className='relative z-10 flex flex-col gap-3'>
                        <div className='flex items-center gap-2'>
                            <div className='p-1.5 bg-yellow-500/20 rounded-lg'>
                                <Crown className='size-3 text-yellow-500' />
                            </div>
                            <span className='text-xs font-bold'>Upgrade to Pro</span>
                        </div>
                        <p className='text-[10px] text-gray-500 leading-relaxed'>Unlock more features and unlimited access.</p>
                    </div>
                </div>

                {/* User Profile */}
                <div 
                    onClick={() => navigate('/profile')}
                    className='flex items-center gap-3 p-3 bg-[#1a1a1a]/50 rounded-2xl border border-[#262626]/50 cursor-pointer hover:bg-[#1a1a1a] transition-all active:scale-95'
                >
                    <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${JSON.parse(localStorage.getItem('user') || '{}').name || 'User'}`} 
                        alt="User" 
                        className='size-10 rounded-xl bg-[#1a1a1a]' 
                    />
                    <div className='flex-1 min-w-0'>
                        <h4 className='text-sm font-bold truncate'>
                            {JSON.parse(localStorage.getItem('user') || '{}').name || 'User Account'}
                        </h4>
                        <p className='text-[10px] text-gray-500 truncate'>
                            {JSON.parse(localStorage.getItem('user') || '{}').email || 'No email set'}
                        </p>
                    </div>
                    <button className='p-1.5 hover:bg-[#262626] rounded-lg transition-colors'>
                        <MoreVertical className='size-4 text-gray-500' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar


