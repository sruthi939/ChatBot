import React, { useState } from 'react'
import { Lock, Mail, ShieldCheck } from 'lucide-react'

const Login = ({ onLogin, error }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(credentials);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0b0b] p-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-500/5 blur-[120px] rounded-full" />

            <div className="bg-[#171717] border border-[#262626] p-12 rounded-[48px] w-full max-w-md relative z-10 shadow-2xl">
                <div className="flex flex-col items-center mb-12">
                    <div className="p-5 bg-green-500/10 rounded-[24px] mb-6 border border-green-500/20">
                        <ShieldCheck className="size-12 text-green-500" />
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">Admin Console</h1>
                    <p className="text-gray-500 text-sm mt-3 font-medium">Authentication required</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Admin Identity</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-600 group-focus-within:text-green-500 transition-colors" />
                            <input 
                                type="email" 
                                placeholder="admin@system.com" 
                                required
                                className="w-full bg-[#0b0b0b] border border-[#262626] p-5 pl-12 rounded-3xl outline-none focus:border-green-500/50 text-white transition-all"
                                onChange={e => setCredentials({...credentials, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Access Key</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-600 group-focus-within:text-green-500 transition-colors" />
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                required
                                className="w-full bg-[#0b0b0b] border border-[#262626] p-5 pl-12 rounded-3xl outline-none focus:border-green-500/50 text-white transition-all"
                                onChange={e => setCredentials({...credentials, password: e.target.value})}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl animate-in shake duration-300">
                            <p className="text-red-500 text-xs text-center font-bold">{error}</p>
                        </div>
                    )}

                    <button className="w-full bg-green-500 hover:bg-green-600 active:scale-[0.98] text-black font-bold py-5 rounded-[24px] transition-all shadow-xl shadow-green-500/20 text-lg">
                        Authorize Session
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
