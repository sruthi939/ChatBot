import React from 'react'
import { UserCheck, UserX } from 'lucide-react'

const UserTable = ({ users, onToggleStatus }) => {
    return (
        <div className='bg-[#171717] border border-[#262626] rounded-[40px] overflow-hidden'>
            <div className='p-8 border-b border-[#262626] flex justify-between items-center'>
                <h3 className='font-bold'>User Management</h3>
                <span className='text-xs text-gray-500'>{users.length} registered accounts</span>
            </div>
            <div className='overflow-x-auto'>
                <table className='w-full text-left'>
                    <thead>
                        <tr className='text-[10px] text-gray-600 uppercase tracking-widest border-b border-[#262626]'>
                            <th className='px-8 py-4'>User</th>
                            <th className='px-8 py-4'>Role</th>
                            <th className='px-8 py-4'>Joined</th>
                            <th className='px-8 py-4 text-right'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-[#262626]'>
                        {users.map((u) => (
                            <tr key={u._id} className='hover:bg-[#1a1a1a] transition-colors'>
                                <td className='px-8 py-6'>
                                    <div className='flex items-center gap-3'>
                                        <img src={u.avatar} className='size-10 rounded-xl bg-[#0b0b0b]' alt="" />
                                        <div>
                                            <p className='text-sm font-bold'>{u.name}</p>
                                            <p className='text-[10px] text-gray-500'>{u.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-8 py-6'>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-green-500/10 text-green-500' : u.role === 'banned' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className='px-8 py-6 text-xs text-gray-500'>
                                    {new Date(u.createdAt).toLocaleDateString()}
                                </td>
                                <td className='px-8 py-6 text-right'>
                                    {u.role !== 'admin' && (
                                        <button 
                                            onClick={() => onToggleStatus(u._id)}
                                            className={`p-3 rounded-xl transition-all active:scale-95 ${u.role === 'banned' ? 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-black' : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'}`}
                                        >
                                            {u.role === 'banned' ? <UserCheck className='size-5' /> : <UserX className='size-5' />}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserTable
