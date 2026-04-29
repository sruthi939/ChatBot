import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Users, Activity, DollarSign, ShieldAlert, UserCheck, UserX, LogOut, Lock } from 'lucide-react'

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('adminUser')));
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', credentials);
      if (data.user.role !== 'admin') {
        setError('Access Denied: Not an Admin');
        return;
      }
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      setUser(data.user);
    } catch (err) {
      setError('Invalid Credentials');
    }
  };

  const fetchStats = async () => {
    if (!user) return;
    try {
      const { data } = await API.get('/admin/stats', { headers: { 'user-id': user.id } });
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) fetchStats();
  }, [user]);

  const toggleStatus = async (targetId) => {
    try {
      await API.post('/admin/toggle-status', { targetUserId: targetId }, { headers: { 'user-id': user.id } });
      fetchStats();
    } catch (err) {
      alert('Action failed');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0b0b] p-4">
        <div className="bg-[#171717] border border-[#262626] p-10 rounded-[40px] w-full max-w-md">
          <div className="flex flex-col items-center mb-10">
            <div className="p-4 bg-green-500/10 rounded-3xl mb-4">
              <Lock className="size-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold">Admin Portal</h1>
            <p className="text-gray-500 text-sm mt-2">Secure access only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="email" placeholder="Admin Email" required
              className="w-full bg-[#0b0b0b] border border-[#262626] p-4 rounded-2xl outline-none focus:border-green-500/50"
              onChange={e => setCredentials({...credentials, email: e.target.value})}
            />
            <input 
              type="password" placeholder="Password" required
              className="w-full bg-[#0b0b0b] border border-[#262626] p-4 rounded-2xl outline-none focus:border-green-500/50"
              onChange={e => setCredentials({...credentials, password: e.target.value})}
            />
            {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}
            <button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-2xl transition-all">Login to Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  if (!stats) return <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0b0b]">Loading...</div>;

  return (
    <div className="min-h-screen w-full bg-[#0b0b0b] text-white p-10">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold">System Console</h1>
          <p className="text-gray-500 uppercase text-[10px] tracking-widest font-bold mt-1">ChatBot AI Management</p>
        </div>
        <button 
          onClick={() => { localStorage.clear(); setUser(null); }}
          className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all font-bold"
        >
          <LogOut className="size-5" /> Logout
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Users', val: stats.totalUsers, icon: <Users />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Activity', val: stats.totalMessages, icon: <Activity />, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Token usage', val: stats.estimatedTokens, icon: <ShieldAlert />, color: 'text-violet-500', bg: 'bg-violet-500/10' },
          { label: 'API Spend', val: `$${stats.estimatedCost}`, icon: <DollarSign />, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
        ].map((c, i) => (
          <div key={i} className="bg-[#171717] border border-[#262626] p-8 rounded-[32px]">
            <div className={`w-12 h-12 ${c.bg} ${c.color} rounded-2xl flex items-center justify-center mb-6`}>{c.icon}</div>
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">{c.label}</p>
            <h2 className="text-3xl font-bold">{c.val}</h2>
          </div>
        ))}
      </div>

      <div className="bg-[#171717] border border-[#262626] rounded-[40px] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#1a1a1a] text-[10px] uppercase tracking-widest text-gray-500">
            <tr>
              <th className="px-8 py-6">User Details</th>
              <th className="px-8 py-6">Role</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262626]">
            {stats.users.map(u => (
              <tr key={u._id} className="hover:bg-[#1c1c1c] transition-all">
                <td className="px-8 py-6 flex items-center gap-4">
                  <img src={u.avatar} className="size-12 rounded-2xl" alt="" />
                  <div>
                    <p className="font-bold">{u.name}</p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${u.role === 'admin' ? 'text-green-500' : 'text-blue-500'}`}>{u.role}</span>
                </td>
                <td className="px-8 py-6 text-right">
                  {u.role !== 'admin' && (
                    <button 
                      onClick={() => toggleStatus(u._id)}
                      className={`p-3 rounded-xl ${u.role === 'banned' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}
                    >
                      {u.role === 'banned' ? <UserCheck className="size-5" /> : <UserX className="size-5" />}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
