import React, { useState } from 'react'
import { Mail, Lock, User, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { register as registerApi } from '../lib/api'

const Register = ({ onLogin }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password) return setError('Please fill in all fields');
        
        setIsLoading(true);
        setError('');
        
        try {
            const { data } = await registerApi({ name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            onLogin(data.user);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-[#0b0b0b] flex flex-col items-center p-10'>
            <div className='w-full max-w-sm flex flex-col items-center mt-12'>
                <div className='w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-green-500/20'>
                    <div className='w-12 h-12 bg-black rounded-2xl flex items-center justify-center'>
                         <span className='text-green-500 font-bold text-xl'>AI</span>
                    </div>
                </div>

                <h1 className='text-3xl font-bold mb-2'>Create Account</h1>
                <p className='text-gray-500 text-sm mb-12'>Join the AI revolution</p>

                {error && <div className='w-full p-4 mb-6 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs text-center'>{error}</div>}

                <div className='w-full space-y-5'>
                    <div className='relative group'>
                        <User className='absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-600 group-focus-within:text-green-500 transition-colors' />
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            className='w-full bg-[#171717] border border-[#262626] rounded-3xl py-5 pl-14 pr-5 outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 transition-all text-sm text-white'
                        />
                    </div>
                    <div className='relative group'>
                        <Mail className='absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-600 group-focus-within:text-green-500 transition-colors' />
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className='w-full bg-[#171717] border border-[#262626] rounded-3xl py-5 pl-14 pr-5 outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 transition-all text-sm text-white'
                        />
                    </div>
                    <div className='relative group'>
                        <Lock className='absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-600 group-focus-within:text-green-500 transition-colors' />
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className='w-full bg-[#171717] border border-[#262626] rounded-3xl py-5 pl-14 pr-14 outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 transition-all text-sm text-white'
                        />
                    </div>
                </div>

                <button 
                    onClick={handleRegister}
                    disabled={isLoading}
                    className='w-full bg-green-500 hover:bg-green-600 text-black font-bold py-5 rounded-3xl mt-10 transition-all shadow-lg shadow-green-500/20 active:scale-95 disabled:opacity-50 disabled:scale-100'
                >
                    {isLoading ? 'Creating account...' : 'Sign Up'}
                </button>

                <p className='mt-12 text-sm text-gray-500'>
                    Already have an account? <button onClick={() => navigate('/login')} className='text-green-500 font-bold hover:underline'>Login</button>
                </p>
            </div>
        </div>
    )
}

export default Register
