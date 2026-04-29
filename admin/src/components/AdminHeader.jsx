import { Search, Bell, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const AdminHeader = ({ user }) => {
    return (
        <header className='h-24 border-b border-[#262626] bg-[#0b0b0b]/80 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-20'>
            <div className='flex items-center gap-4 flex-1'>
                <div className='relative w-full max-w-md group'>
                    <Search className='absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-600 group-focus-within:text-green-500 transition-colors' />
                    <input 
                        type="text" 
                        placeholder="Search system records..." 
                        className='w-full bg-[#171717] border border-[#262626] p-3 pl-12 rounded-2xl outline-none focus:border-green-500/50 text-sm'
                    />
                </div>
            </div>

            <div className='flex items-center gap-6'>
                <button className='p-3 bg-[#171717] border border-[#262626] rounded-2xl hover:bg-[#1a1a1a] transition-all relative text-gray-400'>
                    <Bell size={20} />
                    <div className='absolute top-3 right-3 size-2 bg-green-500 rounded-full border-2 border-[#171717]' />
                </button>
                
                <div className='h-10 w-px bg-[#262626]' />

                <Link to="/profile" className='flex items-center gap-4 hover:opacity-80 transition-opacity'>
                    <div className='text-right hidden md:block'>
                        <p className='text-sm font-bold'>{user.name}</p>
                        <p className='text-[10px] text-gray-500 uppercase font-bold tracking-widest'>{user.role}</p>
                    </div>
                    <div className='size-12 bg-green-500/10 rounded-2xl border border-green-500/20 flex items-center justify-center'>
                        <img src={user.avatar} className='size-10 rounded-xl' alt="" />
                    </div>
                </Link>
            </div>
        </header>
    )
}

export default AdminHeader
