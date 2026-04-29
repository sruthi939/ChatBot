import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'

const SplashScreen = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 2500);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className='fixed inset-0 bg-[#0b0b0b] flex flex-col items-center justify-center z-50 animate-in fade-in duration-500'>
            <div className='relative'>
                <div className='w-24 h-24 bg-green-500 rounded-[32px] flex items-center justify-center shadow-2xl shadow-green-500/20 animate-pulse overflow-hidden'>
                    <img src={assets.logo} alt="Logo" className='w-full h-full object-cover' />
                </div>
                <div className='absolute -inset-4 bg-green-500/10 rounded-[48px] blur-2xl animate-pulse' />
            </div>
            <div className='mt-10 text-center'>
                <h1 className='text-3xl font-bold tracking-tight text-white'>ChatBot AI</h1>
                <p className='text-gray-500 mt-2 text-sm max-w-[200px] leading-relaxed'>
                    Your AI assistant for everyday tasks.
                </p>
            </div>
            
            {/* Loading dots */}
            <div className='absolute bottom-20 flex gap-2'>
                <div className='w-2 h-2 bg-green-500 rounded-full animate-bounce delay-0' />
                <div className='w-2 h-2 bg-green-500 rounded-full animate-bounce delay-150' />
                <div className='w-2 h-2 bg-green-500 rounded-full animate-bounce delay-300' />
            </div>
        </div>
    )
}

const OnboardingScreen = ({ onStart }) => {
    return (
        <div className='min-h-screen bg-[#0b0b0b] flex flex-col p-10 relative overflow-hidden'>
            {/* Background elements */}
            <div className='absolute top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-green-500/5 rounded-full blur-[100px]' />
            
            <div className='flex-1 flex flex-col items-center justify-center relative z-10'>
                <div className='w-64 h-64 relative mb-12'>
                    {/* Visual representation of chat */}
                    <div className='absolute top-0 left-0 w-32 h-20 bg-[#171717] border border-[#262626] rounded-2xl p-4 shadow-xl rotate-[-10deg] animate-bounce'>
                        <div className='w-full h-2 bg-green-500/20 rounded-full mb-2' />
                        <div className='w-2/3 h-2 bg-green-500/20 rounded-full' />
                    </div>
                    <div className='absolute bottom-0 right-0 w-40 h-24 bg-green-500 rounded-2xl p-4 shadow-xl rotate-[5deg] animate-pulse delay-700'>
                        <div className='w-full h-2 bg-white/20 rounded-full mb-2' />
                        <div className='w-3/4 h-2 bg-white/20 rounded-full mb-2' />
                        <div className='w-1/2 h-2 bg-white/20 rounded-full' />
                    </div>
                </div>
                
                <h2 className='text-4xl font-bold text-center mb-4'>Welcome to<br/><span className='text-green-500'>ChatBot AI</span></h2>
                <p className='text-gray-500 text-center max-w-xs leading-relaxed'>
                    Smart conversations, instant answers. Your journey starts here.
                </p>
            </div>
            
            <div className='flex flex-col gap-4 relative z-10 pb-10'>
                <div className='flex justify-center gap-1.5 mb-6'>
                    <div className='w-8 h-1 bg-green-500 rounded-full' />
                    <div className='w-2 h-1 bg-[#262626] rounded-full' />
                    <div className='w-2 h-1 bg-[#262626] rounded-full' />
                </div>
                <button 
                    onClick={onStart}
                    className='w-full bg-green-500 hover:bg-green-600 text-black font-bold py-5 rounded-3xl transition-all shadow-lg shadow-green-500/20 active:scale-95'
                >
                    Get Started
                </button>
                <button className='w-full text-gray-500 font-bold py-2 hover:text-white transition-colors'>
                    Skip
                </button>
            </div>
        </div>
    )
}

const LandingPage = ({ onComplete }) => {
    const [step, setStep] = useState('splash'); // splash, onboarding

    if (step === 'splash') {
        return <SplashScreen onFinish={() => setStep('onboarding')} />
    }

    return <OnboardingScreen onStart={onComplete} />
}

export default LandingPage
