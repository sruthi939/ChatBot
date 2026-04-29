import React from 'react'
import { LayoutDashboard, Users, Megaphone, Settings, LogOut, Shield } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ onLogout }) => {
    const menuItems = [
        { id: '', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'users', label: 'Users', icon: <Users size={20} /> },
        { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={20} /> },
        { id: 'broadcast', label: 'Broadcast', icon: <Megaphone size={20} /> },
        { id: 'logs', label: 'System Logs', icon: <LayoutDashboard size={20} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    ]

    return (
        <div className='w-64 h-screen bg-[#171717] border-r border-[#262626] flex flex-col p-6'>
            <div className='flex items-center gap-3 mb-12 px-2'>
                <div className='p-2 bg-green-500 rounded-xl'>
                    <Shield className='text-black' size={24} />
                </div>
                <h1 className='text-xl font-bold'>Admin Console</h1>
            </div>

            <nav className='flex-1 space-y-2'>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={`/${item.id}`}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm
                            ${isActive ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' : 'text-gray-500 hover:bg-[#1a1a1a] hover:text-white'}
                        `}
                    >
                        {item.icon}
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <button 
                onClick={onLogout}
                className='flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all font-bold text-sm'
            >
                <LogOut size={20} />
                Logout
            </button>
        </div>
    )
}

export default Sidebar
