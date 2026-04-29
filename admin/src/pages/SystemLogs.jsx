import React, { useState, useEffect } from 'react'
import { Terminal, RefreshCw, Eye } from 'lucide-react'
import { API } from '../App'

const SystemLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('adminUser'));

    const fetchLogs = async () => {
        try {
            const { data } = await API.get('/admin/recent-messages', { headers: { 'user-id': user.id } });
            setLogs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(fetchLogs, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='p-10 space-y-10 animate-in slide-in-from-right-4 duration-500'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-4xl font-bold'>System Logs</h1>
                    <p className='text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1'>Monitor real-time engine activity</p>
                </div>
                <button className='p-4 bg-[#171717] border border-[#262626] rounded-2xl hover:bg-[#1a1a1a] transition-all text-gray-400'>
                    <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            <div className='bg-[#171717] border border-[#262626] rounded-[40px] overflow-hidden'>
                <div className='p-8 border-b border-[#262626] flex items-center gap-3'>
                    <Terminal className='text-green-500' size={20} />
                    <h3 className='font-bold'>Console Output</h3>
                </div>
                
                <div className='p-4 space-y-2 font-mono text-[13px]'>
                    {logs.map((log) => (
                        <div key={log._id} className='flex gap-4 p-4 rounded-xl hover:bg-black/20 transition-all border border-transparent hover:border-[#262626] group'>
                            <span className='text-gray-600 min-w-[140px]'>[{new Date(log.timestamp).toLocaleString()}]</span>
                            <span className={`font-bold min-w-[80px] ${log.sender === 'bot' ? 'text-violet-500' : 'text-blue-500'}`}>
                                {log.sender === 'bot' ? 'AI_RESP' : 'USER_MSG'}
                            </span>
                            <span className='text-gray-500 min-w-[120px] font-bold'>{log.user?.name || 'Unknown'}</span>
                            <span className='flex-1 text-gray-300 truncate group-hover:whitespace-normal transition-all'>
                                {log.text.substring(0, 100)}{log.text.length > 100 ? '...' : ''}
                            </span>
                            <span className='text-green-500 font-bold opacity-50'>{log.tokens || 0} tks</span>
                        </div>
                    ))}
                    {logs.length === 0 && <p className='text-center py-10 text-gray-600'>No recent activity detected.</p>}
                </div>
            </div>
        </div>
    )
}

export default SystemLogs
