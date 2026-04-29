import React, { useState } from 'react'
import { ChevronRight, LogOut, X, Lock } from 'lucide-react'
import { assets } from '../assets/assets'
import { changePassword as changePasswordApi } from '../lib/api'

const Settings = ({ onLogout }) => {
    const [preferences, setPreferences] = useState({
        saveHistory: true,
        suggestions: true,
        notifications: false
    });
    const [theme, setTheme] = useState('Dark');
    const [language, setLanguage] = useState('English');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [pwdData, setPwdData] = useState({ old: '', new: '' });
    const [loading, setLoading] = useState(false);

    const togglePreference = (key) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            await changePasswordApi({ userId: user.id, oldPassword: pwdData.old, newPassword: pwdData.new });
            alert('Password updated successfully!');
            setShowPasswordModal(false);
            setPwdData({ old: '', new: '' });
        } catch (err) {
            alert(err.response?.data?.message || 'Error updating password');
        } finally {
            setLoading(false);
        }
    };

    const handleThemeChange = () => {
        const themes = ['Dark', 'Midnight', 'OLED Black'];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const newTheme = themes[nextIndex];
        setTheme(newTheme);
        
        // Real logic: Apply theme to document
        const root = document.documentElement;
        if (newTheme === 'Midnight') {
            root.style.setProperty('--color-bg-deep', '#0a0f1d');
            root.style.setProperty('--color-bg-surface', '#151c2c');
        } else if (newTheme === 'OLED Black') {
            root.style.setProperty('--color-bg-deep', '#000000');
            root.style.setProperty('--color-bg-surface', '#0a0a0a');
        } else {
            root.style.setProperty('--color-bg-deep', '#0b0b0b');
            root.style.setProperty('--color-bg-surface', '#171717');
        }
    };

    const handleLanguageChange = () => {
        const langs = ['English', 'Spanish', 'French', 'German'];
        const currentIndex = langs.indexOf(language);
        const nextIndex = (currentIndex + 1) % langs.length;
        setLanguage(langs[nextIndex]);
    };

    const sections = [
        {
            title: 'General',
            items: [
                { label: 'Theme', value: theme, action: handleThemeChange },
                { label: 'Language', value: language, action: handleLanguageChange }
            ]
        },
        {
            title: 'Preferences',
            items: [
                { label: 'Save chat history', type: 'toggle', active: preferences.saveHistory, key: 'saveHistory' },
                { label: 'Auto suggestions', type: 'toggle', active: preferences.suggestions, key: 'suggestions' },
                { label: 'Sound notifications', type: 'toggle', active: preferences.notifications, key: 'notifications' }
            ]
        },
        {
            title: 'Account',
            items: [
                { label: 'Change Password', type: 'link', action: () => setShowPasswordModal(true) },
                { label: 'Log Out', type: 'danger', action: onLogout }
            ]
        }
    ]

    return (
        <div className='flex-1 bg-[#0b0b0b] p-8 overflow-y-auto custom-scrollbar'>
            <header className='flex items-center gap-4 mb-10'>
                <div className='w-10 h-10 bg-green-500 rounded-xl overflow-hidden'>
                    <img src={assets.logo} alt="Logo" className='w-full h-full object-cover' />
                </div>
                <h1 className='text-2xl font-bold'>Settings</h1>
            </header>

            <div className='space-y-12 max-w-2xl'>
                {sections.map((section, i) => (
                    <div key={i}>
                        <h3 className='text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-6 px-2'>{section.title}</h3>
                        <div className='bg-[#171717] border border-[#262626] rounded-[32px] overflow-hidden'>
                            {section.items.map((item, j) => (
                                <div
                                    key={j}
                                    onClick={() => {
                                        if (item.type === 'toggle') togglePreference(item.key);
                                        if (item.action) item.action();
                                    }}
                                    className={`flex items-center justify-between p-6 cursor-pointer hover:bg-[#1a1a1a] transition-all ${j !== section.items.length - 1 ? 'border-b border-[#262626]' : ''}`}
                                >
                                    <span className={`text-sm font-medium ${item.type === 'danger' ? 'text-red-500' : 'text-gray-200'}`}>
                                        {item.label}
                                    </span>

                                    <div className='flex items-center gap-3'>
                                        {item.value && <span className='text-xs text-gray-500'>{item.value}</span>}
                                        {item.type === 'toggle' && (
                                            <div className={`w-12 h-6 rounded-full p-1 transition-all ${item.active ? 'bg-green-500' : 'bg-[#262626]'}`}>
                                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-all ${item.active ? 'ml-6' : 'ml-0'}`} />
                                            </div>
                                        )}
                                        {item.type === 'link' && <ChevronRight className='size-5 text-gray-700' />}
                                        {item.type === 'danger' && <LogOut className='size-5 text-red-500' />}
                                        {item.value && <ChevronRight className='size-5 text-gray-700' />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4'>
                    <div className='bg-[#171717] border border-[#262626] w-full max-w-md rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 duration-200'>
                        <div className='flex justify-between items-center mb-8'>
                            <div className='flex items-center gap-3'>
                                <div className='p-2 bg-green-500/10 rounded-xl'>
                                    <Lock className='size-5 text-green-500' />
                                </div>
                                <h2 className='text-xl font-bold'>Change Password</h2>
                            </div>
                            <button onClick={() => setShowPasswordModal(false)} className='p-2 hover:bg-[#262626] rounded-xl transition-colors'>
                                <X className='size-5 text-gray-500' />
                            </button>
                        </div>

                        <form onSubmit={handlePasswordChange} className='space-y-6'>
                            <div className='space-y-2'>
                                <label className='text-xs font-bold text-gray-600 uppercase tracking-widest px-1'>Current Password</label>
                                <input 
                                    type="password" 
                                    required
                                    value={pwdData.old}
                                    onChange={(e) => setPwdData({...pwdData, old: e.target.value})}
                                    className='w-full bg-[#0b0b0b] border border-[#262626] rounded-2xl p-4 text-sm outline-none focus:border-green-500/50 transition-all'
                                    placeholder='••••••••'
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-xs font-bold text-gray-600 uppercase tracking-widest px-1'>New Password</label>
                                <input 
                                    type="password" 
                                    required
                                    value={pwdData.new}
                                    onChange={(e) => setPwdData({...pwdData, new: e.target.value})}
                                    className='w-full bg-[#0b0b0b] border border-[#262626] rounded-2xl p-4 text-sm outline-none focus:border-green-500/50 transition-all'
                                    placeholder='••••••••'
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className='w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-500/20 active:scale-95 disabled:opacity-50'
                            >
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Settings
