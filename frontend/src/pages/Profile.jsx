import React from 'react'
import { LogOut } from 'lucide-react'

const Profile = ({ onLogout }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{"name":"User", "email":"user@example.com"}');
    
    const profileData = {
        name: user.name,
        email: user.email,
        memberSince: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "May 19, 2024",
        avatar: user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    }

    return (
        <div className='flex-1 bg-[#0b0b0b] p-10 flex flex-col items-center justify-center'>
            <div className='w-full max-w-2xl bg-[#171717] border border-[#262626] rounded-[40px] p-12 relative overflow-hidden'>
                <div className='absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -mr-32 -mt-32' />
                
                <h1 className='text-3xl font-bold mb-12 relative z-10'>Profile</h1>

                <div className='flex flex-col items-center mb-16 relative z-10'>
                    <div className='relative'>
                        <img src={profileData.avatar} alt="Avatar" className='size-40 rounded-[40px] border-4 border-[#262626] shadow-2xl' />
                        <div className='absolute bottom-2 right-2 size-8 bg-green-500 rounded-full border-4 border-[#171717] flex items-center justify-center'>
                            <div className='size-3 bg-white rounded-full shadow-sm' />
                        </div>
                    </div>
                </div>

                <div className='space-y-8 mb-16 relative z-10'>
                    <div className='flex justify-between items-center border-b border-[#262626] pb-4'>
                        <span className='text-gray-500 font-medium'>Full Name</span>
                        <span className='font-bold'>{profileData.name}</span>
                    </div>
                    <div className='flex justify-between items-center border-b border-[#262626] pb-4'>
                        <span className='text-gray-500 font-medium'>Email</span>
                        <span className='font-bold text-gray-400'>{profileData.email}</span>
                    </div>
                    <div className='flex justify-between items-center border-b border-[#262626] pb-4'>
                        <span className='text-gray-500 font-medium'>Member Since</span>
                        <span className='font-bold'>{profileData.memberSince}</span>
                    </div>
                </div>

                <div className='flex justify-center relative z-10'>
                    <button 
                        onClick={onLogout}
                        className='flex items-center gap-3 px-10 py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl font-bold transition-all border border-red-500/20 active:scale-95 cursor-pointer'
                    >
                        <LogOut className='size-5' />
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile