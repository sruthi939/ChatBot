import React from 'react'
import { Users as UsersIcon, Activity, ExternalLink, DollarSign } from 'lucide-react'

const Dashboard = ({ stats }) => {
    const cards = [
        { label: 'Total Users', val: stats.totalUsers, icon: <UsersIcon />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Total Activity', val: stats.totalMessages, icon: <Activity />, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Token usage', val: stats.estimatedTokens, icon: <ExternalLink />, color: 'text-violet-500', bg: 'bg-violet-500/10' },
        { label: 'API Spend', val: `$${stats.estimatedCost}`, icon: <DollarSign />, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    ]

    return (
        <div className='p-10 space-y-12 animate-in fade-in duration-500'>
            <div>
                <h1 className='text-4xl font-bold'>Overview</h1>
                <p className='text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1'>Real-time system performance</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                {cards.map((c, i) => (
                    <div key={i} className='bg-[#171717] border border-[#262626] p-8 rounded-[32px]'>
                        <div className={`w-12 h-12 ${c.bg} ${c.color} rounded-2xl flex items-center justify-center mb-6`}>{c.icon}</div>
                        <p className='text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1'>{c.label}</p>
                        <h2 className='text-3xl font-bold'>{c.val}</h2>
                    </div>
                ))}
            </div>

            <div className='bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 p-8 rounded-[40px]'>
                <h3 className='text-lg font-bold mb-2'>Pro Tip: Monitor Token Usage</h3>
                <p className='text-gray-500 text-sm max-w-2xl'>Your current estimated cost is based on real-time token tracking from OpenAI. Keep an eye on the "API Spend" to manage your budget effectively.</p>
            </div>
        </div>
    )
}

export default Dashboard
