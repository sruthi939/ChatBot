import React from 'react'
import { Mail, Lock, Eye, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Login = ({ onLogin }) => {
    const navigate = useNavigate();

    return (
        <div className='min-h-screen bg-[#0b0b0b] flex flex-col items-center p-10'>
            <div className='w-full max-w-sm flex flex-col items-center mt-12'>
                <div className='w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-green-500/20'>
                    <div className='w-12 h-12 bg-black rounded-2xl flex items-center justify-center'>
                         <span className='text-green-500 font-bold text-xl'>AI</span>
                    </div>
                </div>

                <h1 className='text-3xl font-bold mb-2'>Welcome Back!</h1>
                <p className='text-gray-500 text-sm mb-12'>Sign in to continue</p>

                <div className='w-full space-y-5'>
                    <div className='relative group'>
                        <Mail className='absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-600 group-focus-within:text-green-500 transition-colors' />
                        <input 
                            type="email" 
                            placeholder="Email"
                            className='w-full bg-[#171717] border border-[#262626] rounded-3xl py-5 pl-14 pr-5 outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 transition-all text-sm'
                        />
                    </div>
                    <div className='relative group'>
                        <Lock className='absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-600 group-focus-within:text-green-500 transition-colors' />
                        <input 
                            type="password" 
                            placeholder="Password"
                            className='w-full bg-[#171717] border border-[#262626] rounded-3xl py-5 pl-14 pr-14 outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 transition-all text-sm'
                        />
                        <button className='absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white'>
                            <Eye className='size-5' />
                        </button>
                    </div>
                </div>

                <button className='w-full text-right mt-3 text-xs text-gray-600 font-medium hover:text-green-500 transition-colors'>
                    Forgot password?
                </button>

                <button 
                    onClick={() => {
                        onLogin();
                        navigate('/');
                    }}
                    className='w-full bg-green-500 hover:bg-green-600 text-black font-bold py-5 rounded-3xl mt-10 transition-all shadow-lg shadow-green-500/20 active:scale-95'
                >
                    Login
                </button>

                <div className='w-full flex items-center gap-4 my-10'>
                    <div className='flex-1 h-[1px] bg-[#262626]' />
                    <span className='text-[10px] text-gray-600 uppercase font-bold tracking-widest'>or continue with</span>
                    <div className='flex-1 h-[1px] bg-[#262626]' />
                </div>

                <div className='flex gap-5'>
                    {/* Google */}
                    <button className='p-4 bg-[#171717] border border-[#262626] rounded-2xl hover:border-gray-600 transition-all active:scale-95'>
                        <svg className='size-6 text-white' viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.288 1.288-3.312 2.712-7.112 2.712-6.048 0-10.744-4.896-10.744-10.944s4.696-10.944 10.744-10.944c3.272 0 5.672 1.288 7.448 2.968l2.312-2.312c-2.008-1.92-4.632-3.112-8.32-3.112-7.856 0-14.328 6.472-14.328 14.32s6.472 14.32 14.328 14.32c4.136 0 7.448-1.352 9.968-3.976 2.568-2.568 3.424-6.144 3.424-8.784 0-.848-.064-1.664-.192-2.448h-11.8z"/></svg>
                    </button>
                    {/* Apple */}
                    <button className='p-4 bg-[#171717] border border-[#262626] rounded-2xl hover:border-gray-600 transition-all active:scale-95'>
                        <svg className='size-6 text-white' viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05 1.72-3.11 1.72-1.01 0-1.36-.61-2.51-.61-1.15 0-1.55.61-2.51.61-1.06 0-2.13-.77-3.11-1.72-2.01-1.92-3.52-5.46-3.52-8.74 0-3.36 1.83-5.23 3.59-5.23 1.13 0 1.94.7 2.64.7.71 0 1.51-.7 2.64-.7 1.76 0 3.59 1.87 3.59 5.23 0 3.28-1.51 6.82-3.52 8.74zm-2.45-16.7c0 1.34-1.1 2.45-2.45 2.45-1.34 0-2.45-1.1-2.45-2.45 0-1.34 1.11-2.45 2.45-2.45 1.35 0 2.45 1.11 2.45 2.45z"/></svg>
                    </button>
                    {/* Github */}
                    <button className='p-4 bg-[#171717] border border-[#262626] rounded-2xl hover:border-gray-600 transition-all active:scale-95'>
                        <svg className='size-6 text-white' viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </button>
                </div>

                <p className='mt-12 text-sm text-gray-500'>
                    Don't have an account? <button className='text-green-500 font-bold hover:underline'>Sign Up</button>
                </p>
            </div>
        </div>
    )
}

export default Login
