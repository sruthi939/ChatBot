import React from 'react'
import { Mail, Lock, Eye, Chrome, Github, Apple } from 'lucide-react'
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
                    <button className='p-4 bg-[#171717] border border-[#262626] rounded-2xl hover:border-gray-600 transition-all active:scale-95'>
                        <Chrome className='size-6 text-white' />
                    </button>
                    <button className='p-4 bg-[#171717] border border-[#262626] rounded-2xl hover:border-gray-600 transition-all active:scale-95'>
                        <Apple className='size-6 text-white' />
                    </button>
                    <button className='p-4 bg-[#171717] border border-[#262626] rounded-2xl hover:border-gray-600 transition-all active:scale-95'>
                        <Github className='size-6 text-white' />
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