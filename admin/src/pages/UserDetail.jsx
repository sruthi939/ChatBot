import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, MessageSquare, Clock, User, Shield } from 'lucide-react'
import { API } from '../App'

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const admin = JSON.parse(localStorage.getItem('adminUser'));

    useEffect(() => {
        const fetchUserHistory = async () => {
            try {
                const { data } = await API.get(`/admin/user-history/${id}`, { headers: { 'user-id': admin.id } });
                setMessages(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUserHistory();
    }, [id]);

    if (loading) return <div className='p-10 text-gray-500'>Auditing user records...</div>;

    return (
        <div className='p-10 space-y-10 animate-in slide-in-from-left-4 duration-500'>
            <div className='flex items-center gap-4'>
                <button 
                    onClick={() => navigate('/users')}
                    className='p-3 bg-[#171717] border border-[#262626] rounded-2xl hover:bg-[#262626] transition-all text-gray-400'
                >
                    <ChevronLeft size={20} />
                </button>
                <div>
                    <h1 className='text-4xl font-bold'>User Audit</h1>
                    <p className='text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1'>Conversation Oversight: {id}</p>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {/* Stats Card */}
                <div className='md:col-span-1 space-y-6'>
                    <div className='bg-[#171717] border border-[#262626] p-8 rounded-[40px]'>
                        <h3 className='font-bold mb-6 flex items-center gap-2'>
                            <Shield className='text-green-500' size={18} />
                            Account Summary
                        </h3>
                        <div className='space-y-4'>
                            <div className='flex justify-between'>
                                <span className='text-gray-500 text-xs'>Total Messages</span>
                                <span className='font-bold text-sm'>{messages.length}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-500 text-xs'>Last Activity</span>
                                <span className='font-bold text-sm'>{messages[0] ? new Date(messages[0].timestamp).toLocaleDateString() : 'Never'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conversation Log */}
                <div className='md:col-span-2 bg-[#171717] border border-[#262626] rounded-[40px] p-8'>
                    <h3 className='font-bold mb-8 flex items-center gap-2'>
                        <MessageSquare className='text-violet-500' size={18} />
                        Live Conversation Log
                    </h3>

                    <div className='space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar pr-4'>
                        {messages.map((m, i) => (
                            <div key={i} className={`p-6 rounded-3xl border ${m.sender === 'bot' ? 'bg-[#0b0b0b] border-[#262626]' : 'bg-green-500/5 border-green-500/10'}`}>
                                <div className='flex justify-between items-center mb-3'>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${m.sender === 'bot' ? 'text-violet-500' : 'text-green-500'}`}>
                                        {m.sender === 'bot' ? 'AI Response' : 'User Prompt'}
                                    </span>
                                    <span className='text-[10px] text-gray-600 font-mono'>{new Date(m.timestamp).toLocaleString()}</span>
                                </div>
                                <p className='text-sm text-gray-300 leading-relaxed'>{m.text}</p>
                                {m.tokens > 0 && (
                                    <div className='mt-4 pt-4 border-t border-[#262626] flex justify-end'>
                                        <span className='text-[10px] text-gray-600 font-bold uppercase'>{m.tokens} Tokens Consumed</span>
                                    </div>
                                )}
                            </div>
                        ))}
                        {messages.length === 0 && (
                            <div className='text-center py-20 text-gray-600'>
                                <p>This user has no recorded activity.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetail
