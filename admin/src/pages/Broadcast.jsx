import React, { useState } from 'react'
import { Megaphone, Send, Info } from 'lucide-react'

const Broadcast = ({ onSend }) => {
    const [msg, setMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSend(msg);
        setMsg('');
    }

    return (
        <div className='p-10 space-y-10 animate-in zoom-in-95 duration-500'>
            <div>
                <h1 className='text-4xl font-bold'>System Broadcast</h1>
                <p className='text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1'>Send announcements to all users</p>
            </div>

            <div className='bg-[#171717] border border-[#262626] rounded-[40px] p-10'>
                <div className='flex items-center gap-4 mb-8 p-4 bg-blue-500/10 rounded-2xl text-blue-400 text-sm'>
                    <Info size={20} />
                    <p>Broadcast messages will be sent to the global notification system and displayed to all active users.</p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <textarea 
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder='Type your global announcement here...'
                        className='w-full bg-[#0b0b0b] border border-[#262626] rounded-3xl p-6 min-h-[200px] outline-none focus:border-red-500/50 transition-all text-lg resize-none'
                        required
                    />
                    <button 
                        type='submit'
                        className='w-full md:w-auto px-12 py-5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-500/20 active:scale-95 flex items-center justify-center gap-3'
                    >
                        <Send size={20} />
                        Broadcast Now
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Broadcast
