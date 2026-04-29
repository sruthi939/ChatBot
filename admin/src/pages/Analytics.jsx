import React, { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, DollarSign, Users } from 'lucide-react'
import { API } from '../App'

const Analytics = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('adminUser'));

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await API.get('/admin/user-analytics', { headers: { 'user-id': user.id } });
                setData(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return <div className='p-10 text-gray-500'>Computing financial data...</div>;

    return (
        <div className='p-10 space-y-10 animate-in fade-in duration-500'>
            <div>
                <h1 className='text-4xl font-bold'>Cost Analytics</h1>
                <p className='text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1'>Financial breakdown per user</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='bg-[#171717] border border-[#262626] rounded-[40px] p-8'>
                    <div className='flex items-center gap-3 mb-8'>
                        <div className='p-2 bg-violet-500/10 rounded-xl'>
                            <BarChart3 className='size-5 text-violet-500' />
                        </div>
                        <h3 className='font-bold'>Top Token Consumers</h3>
                    </div>

                    <div className='space-y-6'>
                        {data.slice(0, 5).map((u, i) => (
                            <div key={i} className='space-y-2'>
                                <div className='flex justify-between items-end'>
                                    <div>
                                        <p className='font-bold text-sm'>{u.name}</p>
                                        <p className='text-[10px] text-gray-500'>{u.email}</p>
                                    </div>
                                    <p className='text-xs font-mono text-violet-400'>{u.totalTokens.toLocaleString()} tokens</p>
                                </div>
                                <div className='w-full h-1.5 bg-[#0b0b0b] rounded-full overflow-hidden'>
                                    <div 
                                        className='h-full bg-violet-500 transition-all duration-1000' 
                                        style={{ width: `${Math.min(100, (u.totalTokens / (data[0]?.totalTokens || 1)) * 100)}%` }} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='bg-[#171717] border border-[#262626] rounded-[40px] p-8'>
                    <div className='flex items-center gap-3 mb-8'>
                        <div className='p-2 bg-yellow-500/10 rounded-xl'>
                            <TrendingUp className='size-5 text-yellow-500' />
                        </div>
                        <h3 className='font-bold'>Revenue vs Cost</h3>
                    </div>
                    
                    <div className='h-[200px] flex items-end gap-4 px-4'>
                        {data.slice(0, 8).map((u, i) => (
                            <div key={i} className='flex-1 flex flex-col items-center gap-2 group'>
                                <div 
                                    className='w-full bg-yellow-500/20 group-hover:bg-yellow-500/40 border-t-2 border-yellow-500 transition-all duration-1000 rounded-t-lg relative'
                                    style={{ height: `${Math.min(100, (u.estimatedCost / (data[0]?.estimatedCost || 1)) * 100)}%` }}
                                >
                                    <div className='absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black p-1 rounded text-[8px] font-bold'>
                                        ${u.estimatedCost.toFixed(4)}
                                    </div>
                                </div>
                                <span className='text-[8px] text-gray-600 font-bold uppercase rotate-45 mt-4'>{u.name.split(' ')[0]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='bg-[#171717] border border-[#262626] rounded-[40px] overflow-hidden'>
                <table className='w-full text-left'>
                    <thead className='bg-[#1a1a1a] text-[10px] uppercase tracking-widest text-gray-500'>
                        <tr>
                            <th className='px-8 py-6'>User</th>
                            <th className='px-8 py-6'>Messages</th>
                            <th className='px-8 py-6'>Total Tokens</th>
                            <th className='px-8 py-6 text-right'>Estimated Cost</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-[#262626] text-sm'>
                        {data.map((u, i) => (
                            <tr key={i} className='hover:bg-[#1c1c1c] transition-all'>
                                <td className='px-8 py-6'>
                                    <p className='font-bold'>{u.name}</p>
                                    <p className='text-[10px] text-gray-500'>{u.email}</p>
                                </td>
                                <td className='px-8 py-6 text-gray-400'>{u.messageCount}</td>
                                <td className='px-8 py-6 font-mono text-violet-400'>{u.totalTokens.toLocaleString()}</td>
                                <td className='px-8 py-6 text-right font-bold text-yellow-500'>${u.estimatedCost.toFixed(4)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Analytics
