import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Lock } from 'lucide-react'

// Layouts & Pages
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Broadcast from './pages/Broadcast'
import AdminSettings from './pages/AdminSettings'
import SystemLogs from './pages/SystemLogs'
import Analytics from './pages/Analytics'
import UserDetail from './pages/UserDetail'
import AdminProfile from './pages/AdminProfile'
import Login from './pages/Login'
import AdminLayout from './layouts/AdminLayout'

export const API = axios.create({ baseURL: 'http://localhost:5000/api' });

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

  const sendBroadcast = async (msg) => {
    try {
      await API.post('/admin/broadcast', { message: msg }, { headers: { 'user-id': user.id } });
      alert('Broadcast sent successfully!');
    } catch (err) {
      alert('Failed to send broadcast');
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} error={error} />;
  }

  if (!stats) return <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0b0b] text-white">Loading System Data...</div>;

  return (
    <BrowserRouter>
      <AdminLayout 
        user={user} 
        onLogout={() => { localStorage.clear(); setUser(null); window.location.href = '/'; }}
      >
        <Routes>
          <Route path="/" element={<Dashboard stats={stats} />} />
          <Route path="/users" element={<Users users={stats.users} onToggleStatus={toggleStatus} />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/broadcast" element={<Broadcast onSend={sendBroadcast} />} />
          <Route path="/logs" element={<SystemLogs />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;
