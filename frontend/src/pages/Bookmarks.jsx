import React, { useState, useEffect } from 'react'
import { Bookmark, ChevronRight, Loader } from 'lucide-react'
import { getBookmarks } from '../lib/api'
import { assets } from '../assets/assets'

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookmarks = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) return;
            try {
                const { data } = await getBookmarks(user.id);
                setBookmarks(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookmarks();
    }, []);

    if (loading) {
        return (
            <div className='flex-1 flex items-center justify-center bg-[#0b0b0b]'>
                <Loader className='animate-spin text-green-500' size={32} />
            </div>
        );
    }

    return (
        <div className='flex-1 bg-[#0b0b0b] p-8 overflow-y-auto custom-scrollbar'>
            <header className='flex items-center gap-4 mb-10'>
                <div className='w-10 h-10 bg-green-500 rounded-xl overflow-hidden flex items-center justify-center'>
                    <Bookmark className='text-black size-6' />
                </div>
                <h1 className='text-2xl font-bold'>My Library</h1>
            </header>

            {bookmarks.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-20 text-gray-600'>
                    <Bookmark size={48} className='mb-4 opacity-20' />
                    <p className='font-bold'>No bookmarks yet</p>
                    <p className='text-xs uppercase tracking-widest mt-1'>Save important messages to see them here</p>
                </div>
            ) : (
                <div className='space-y-6'>
                    {bookmarks.map((item, i) => (
                        <div key={i} className='bg-[#171717] border border-[#262626] p-6 rounded-[32px] relative group hover:border-green-500/30 transition-all cursor-pointer'>
                            <div className='absolute top-6 right-6 p-2 bg-green-500 rounded-lg shadow-lg shadow-green-500/20'>
                                <Bookmark className='size-4 text-black fill-black' />
                            </div>
                            <h3 className='font-bold mb-3 pr-10'>{item.title}</h3>
                            <p className='text-xs text-gray-400 leading-relaxed mb-6 whitespace-pre-wrap'>{item.text}</p>
                            <div className='flex justify-between items-center'>
                                <span className='text-[10px] text-gray-600 font-bold uppercase tracking-wider'>Bookmarked on {new Date(item.date).toLocaleDateString()}</span>
                                <ChevronRight className='size-4 text-gray-700' />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Bookmarks
