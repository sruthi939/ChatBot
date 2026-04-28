import React, { useState } from 'react'
import { ChevronRight, LogOut } from 'lucide-react'

const Settings = () => {
    const [preferences, setPreferences] = useState({
        saveHistory: true,
        suggestions: true,
        notifications: false
    });

    const togglePreference = (key) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const sections = [
        {
            title: 'General',
            items: [
                { label: 'Theme', value: 'Dark' },
                { label: 'Language', value: 'English' }
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
                { label: 'Change Password', type: 'link' },
                { label: 'Log Out', type: 'danger' }
            ]
        }
    ]

    return (
        <div className='flex-1 bg-[#0b0b0b] p-8 overflow-y-auto custom-scrollbar'>
            <header className='mb-10'>
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
                                    onClick={() => item.type === 'toggle' && togglePreference(item.key)}
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
        </div>
    )
}

export default Settings

