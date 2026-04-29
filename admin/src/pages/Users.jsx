import { UserCheck, UserX, Eye, Download } from 'lucide-react'
import { Link } from 'react-router-dom'

const Users = ({ users, onToggleStatus }) => {
    const exportToCSV = () => {
        const headers = ["Name,Email,Role,Joined\n"];
        const rows = users.map(u => `${u.name},${u.email},${u.role},${u.createdAt}\n`);
        const blob = new Blob([headers, ...rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users_audit_${new Date().toLocaleDateString()}.csv`;
        a.click();
    };
    return (
        <div className='p-10 space-y-10 animate-in slide-in-from-bottom-4 duration-500'>
            <div className='flex justify-between items-end'>
                <div>
                    <h1 className='text-4xl font-bold'>User Management</h1>
                    <p className='text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1'>Audit and control system access</p>
                </div>
                <button 
                    onClick={exportToCSV}
                    className='flex items-center gap-2 px-6 py-3 bg-[#171717] border border-[#262626] rounded-2xl text-xs font-bold text-gray-400 hover:text-white hover:border-gray-600 transition-all'
                >
                    <Download size={14} />
                    Export Audit Log
                </button>
            </div>

            <div className='bg-[#171717] border border-[#262626] rounded-[40px] overflow-hidden'>
                <table className='w-full text-left'>
                    <thead className='bg-[#1a1a1a] text-[10px] uppercase tracking-widest text-gray-500'>
                        <tr>
                            <th className='px-8 py-6'>Account</th>
                            <th className='px-8 py-6'>Status</th>
                            <th className='px-8 py-6'>Join Date</th>
                            <th className='px-8 py-6 text-right'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-[#262626]'>
                        {users.map(u => (
                            <tr key={u._id} className='hover:bg-[#1c1c1c] transition-all group'>
                                <td className='px-8 py-6 flex items-center gap-4'>
                                    <img src={u.avatar} className='size-12 rounded-2xl grayscale group-hover:grayscale-0 transition-all' alt="" />
                                    <div>
                                        <p className='font-bold'>{u.name}</p>
                                        <p className='text-xs text-gray-500'>{u.email}</p>
                                    </div>
                                </td>
                                <td className='px-8 py-6'>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${u.role === 'admin' ? 'text-green-500 bg-green-500/10' : u.role === 'banned' ? 'text-red-500 bg-red-500/10' : 'text-blue-500 bg-blue-500/10'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className='px-8 py-6 text-xs text-gray-400'>
                                    {new Date(u.createdAt).toLocaleDateString()}
                                </td>
                                <td className='px-8 py-6 text-right flex justify-end gap-3'>
                                    <Link 
                                        to={`/user/${u._id}`}
                                        className="p-3 bg-[#171717] border border-[#262626] rounded-xl hover:bg-[#262626] transition-all text-gray-500"
                                        title="Audit User History"
                                    >
                                        <Eye size={20} />
                                    </Link>
                                    {u.role !== 'admin' && (
                                        <button 
                                            onClick={() => onToggleStatus(u._id)}
                                            className={`p-3 rounded-xl transition-all active:scale-95 ${u.role === 'banned' ? 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-black' : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'}`}
                                        >
                                            {u.role === 'banned' ? <UserCheck size={20} /> : <UserX size={20} />}
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

export default Users
