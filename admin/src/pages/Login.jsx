import React, { useState } from 'react'
import { Lock, Mail, ShieldCheck, Zap, Globe, Activity } from 'lucide-react'

const Login = ({ onLogin, error }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(credentials);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0b0b] p-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-green-600/10 blur-[160px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-green-400/5 blur-[160px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            
            {/* Mesh Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 bg-[#121212] border border-white/5 rounded-[48px] overflow-hidden relative z-10 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                
                {/* Left Side: Brand/Info */}
                <div className="hidden md:flex flex-col justify-between p-16 bg-gradient-to-br from-green-500/10 to-transparent border-r border-white/5">
                    <div>
                        <div className="size-16 bg-green-500 rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-green-500/20">
                            <Zap className="text-black" size={32} />
                        </div>
                        <h2 className="text-5xl font-bold leading-tight">Secure <br /><span className="text-green-500">Administrator</span> <br />Gateway</h2>
                        <p className="text-gray-400 mt-6 text-lg max-w-xs leading-relaxed">
                            Access the neural core of your AI ecosystem. Manage users, monitor tokens, and control global system states.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-500 uppercase tracking-tighter">
                            <Globe size={16} className="text-green-500" />
                            <span>Global Scale</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-500 uppercase tracking-tighter">
                            <Activity size={16} className="text-green-500" />
                            <span>Live Monitor</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="p-12 md:p-16 flex flex-col justify-center">
                    <div className="mb-12">
                        <h1 className="text-3xl font-bold">Identity Verification</h1>
                        <p className="text-gray-500 text-sm mt-2">Enter your authority credentials to proceed</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-1">Admin Identity</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-600 group-focus-within:text-green-500 transition-colors" />
                                <input 
                                    type="email" 
                                    placeholder="name@authority.ai" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 p-6 pl-14 rounded-3xl outline-none focus:border-green-500/40 text-white transition-all hover:bg-white/[0.08]"
                                    onChange={e => setCredentials({...credentials, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-1">Access Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-600 group-focus-within:text-green-500 transition-colors" />
                                <input 
                                    type="password" 
                                    placeholder="••••••••••••" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 p-6 pl-14 rounded-3xl outline-none focus:border-green-500/40 text-white transition-all hover:bg-white/[0.08]"
                                    onChange={e => setCredentials({...credentials, password: e.target.value})}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-3xl animate-in fade-in zoom-in-95 duration-300">
                                <p className="text-red-500 text-xs text-center font-bold">{error}</p>
                            </div>
                        )}

                        <button className="w-full bg-green-500 hover:bg-green-600 active:scale-[0.98] text-black font-bold py-6 rounded-[28px] transition-all shadow-xl shadow-green-500/20 text-lg flex items-center justify-center gap-3">
                            <ShieldCheck size={22} />
                            Authorize Session
                        </button>
                    </form>
                    
                    <p className="mt-12 text-center text-xs text-gray-600 font-medium">
                        System authorized access only. All activities are logged.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
