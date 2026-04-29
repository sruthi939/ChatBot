import React, { useEffect, useState } from 'react'
import { Users, Activity, DollarSign, ShieldAlert, ExternalLink } from 'lucide-react'
import { getAdminStats, toggleUserStatus } from '../lib/api'
import { assets } from '../assets/assets'
import UserTable from './UserTable'

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const { data } = await getAdminStats(user.id);
            setStats(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Access Denied');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleToggleStatus = async (targetId) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            await toggleUserStatus(user.id, targetId);
            fetchStats();
        } catch (err) {
            alert('Failed to update user status');
        }
    };

    if (loading) return <div className='flex-1 flex items-center justify-center bg-[#0b0b0b]'><div className='animate-spin size-10 border-4 border-green-500 border-t-transparent rounded-full' /></div>;
    
    if (error) return (
        <div className='flex-1 flex flex-col items-center justify-center bg-[#0b0b0b] p-10 text-center'>
            <div className='w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6'>
                <ShieldAlert className='size-12 text-red-500' />
            </div>
            <h1 className='text-3xl font-bold mb-4'>Restricted Access</h1>
            <p className='text-gray-500 max-w-md'>You do not have the administrative privileges required to view this dashboard. Please contact your system administrator.</p>
        </div>
    );

    const cards = [
        { title: 'Total Users', value: stats.totalUsers, icon: <Users className='text-blue-500' />, bg: 'bg-blue-500/10' },
        { title: 'Total Messages', value: stats.totalMessages, icon: <Activity className='text-green-500' />, bg: 'bg-green-500/10' },
        { title: 'Estimated Tokens', value: stats.estimatedTokens.toLocaleString(), icon: <ExternalLink className='text-violet-500' />, bg: 'bg-violet-500/10' },
        { title: 'Est. API Cost', value: `$${stats.estimatedCost}`, icon: <DollarSign className='text-yellow-500' />, bg: 'bg-yellow-500/10' },
    ]

    return (
        <div className='flex-1 bg-[#0b0b0b] p-10 overflow-y-auto custom-scrollbar'>
            <header className='flex items-center gap-4 mb-12'>
                <div className='w-12 h-12 bg-green-500 rounded-2xl overflow-hidden shadow-lg shadow-green-500/20'>
                    <img src={assets.logo} alt="Logo" className='w-full h-full object-cover' />
                </div>
                <div>
                    <h1 className='text-2xl font-bold'>Admin Control Center</h1>
                    <p className='text-[10px] text-gray-500 uppercase tracking-widest font-bold'>System Overview & Management</p>
                </div>
            </header>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-12'>
                {cards.map((card, i) => (
                    <div key={i} className='bg-[#171717] border border-[#262626] p-6 rounded-3xl'>
                        <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-4`}>
                            {card.icon}
                        </div>
                        <p className='text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1'>{card.title}</p>
                        <h2 className='text-2xl font-bold'>{card.value}</h2>
                    </div>
                ))}
            </div>

            <UserTable users={stats.users} onToggleStatus={handleToggleStatus} />
        </div>
    )
}

export default AdminDashboard
