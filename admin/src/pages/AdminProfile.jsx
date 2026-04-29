import React, { useState } from 'react'
import { User, Shield, Lock, Save, Camera } from 'lucide-react'
import { API } from '../App'

const AdminProfile = () => {
    const admin = JSON.parse(localStorage.getItem('adminUser'));
    const [passwords, setPasswords] = useState({ current: '', new: '' });
    const [loading, setLoading] = useState(false);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Reusing the user change-password endpoint as it's the same logic
            await API.post('/auth/change-password', {
                userId: admin.id,
                currentPassword: passwords.current,
                newPassword: passwords.new
            });
            alert('Admin credentials updated successfully!');
            setPasswords({ current: '', new: '' });
        } catch (err) {
            alert('Failed to update credentials. Check your current password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-10 space-y-10 animate-in zoom-in-95 duration-500'>
            <div>
                <h1 className='text-4xl font-bold'>Admin Security</h1>
                <p className='text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1'>Manage console access and credentials</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                {/* Profile Card */}
                <div className='md:col-span-1 space-y-6'>
                    <div className='bg-[#171717] border border-[#262626] rounded-[40px] p-10 flex flex-col items-center text-center'>
                        <div className='relative group mb-6'>
                            <div className='size-32 bg-green-500/10 rounded-[40px] border border-green-500/20 flex items-center justify-center'>
                                <img src={admin.avatar} className='size-24 rounded-3xl' alt="" />
                            </div>
                            <div className='absolute bottom-0 right-0 p-2 bg-green-500 rounded-xl cursor-pointer hover:scale-110 transition-all'>
                                <Camera size={16} className='text-black' />
                            </div>
                        </div>
                        <h2 className='text-2xl font-bold'>{admin.name}</h2>
                        <p className='text-xs text-gray-500 uppercase font-bold tracking-widest mt-1'>{admin.role} Authority</p>
                        
                        <div className='w-full h-px bg-[#262626] my-8' />
                        
                        <div className='w-full space-y-4'>
                            <div className='flex items-center gap-3 text-left p-4 bg-[#0b0b0b] rounded-2xl border border-[#262626]'>
                                <Shield className='text-green-500' size={18} />
                                <div>
                                    <p className='text-[10px] text-gray-500 font-bold uppercase'>Security Level</p>
                                    <p className='text-sm font-bold'>Full Access</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Password Change */}
                <div className='md:col-span-2 bg-[#171717] border border-[#262626] rounded-[40px] p-10'>
                    <h3 className='font-bold mb-8 flex items-center gap-2'>
                        <Lock className='text-red-500' size={18} />
                        Rotate Access Keys
                    </h3>

                    <form onSubmit={handleUpdatePassword} className='space-y-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1'>Current Access Key</label>
                                <input 
                                    type="password"
                                    value={passwords.current}
                                    onChange={e => setPasswords({...passwords, current: e.target.value})}
                                    className='w-full bg-[#0b0b0b] border border-[#262626] p-4 rounded-2xl outline-none focus:border-red-500/50'
                                    required
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1'>New Access Key</label>
                                <input 
                                    type="password"
                                    value={passwords.new}
                                    onChange={e => setPasswords({...passwords, new: e.target.value})}
                                    className='w-full bg-[#0b0b0b] border border-[#262626] p-4 rounded-2xl outline-none focus:border-red-500/50'
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            disabled={loading}
                            className='flex items-center gap-3 px-10 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-500/20 active:scale-95 disabled:opacity-50'
                        >
                            <Save size={20} />
                            {loading ? 'Securing...' : 'Update Security Credentials'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminProfile
