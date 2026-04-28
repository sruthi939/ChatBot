import React from 'react'
import { Bookmark, ChevronRight } from 'lucide-react'
import { BookmarksList } from '../lib/data'

const Bookmarks = () => {
    return (
        <div className='flex-1 bg-[#0b0b0b] p-8 overflow-y-auto custom-scrollbar'>
            <header className='mb-10'>
                <h1 className='text-2xl font-bold'>Bookmarks</h1>
            </header>

            <div className='space-y-6'>
                {BookmarksList.map((item, i) => (
                    <div key={i} className='bg-[#171717] border border-[#262626] p-6 rounded-[32px] relative group hover:border-green-500/30 transition-all cursor-pointer'>
                        <div className='absolute top-6 right-6 p-2 bg-green-500 rounded-lg shadow-lg shadow-green-500/20'>
                            <Bookmark className='size-4 text-black fill-black' />
                        </div>
                        <h3 className='font-bold mb-3 pr-10'>{item.title}</h3>
                        <p className='text-xs text-gray-500 leading-relaxed mb-6 whitespace-pre-wrap'>{item.desc}</p>
                        <div className='flex justify-between items-center'>
                            <span className='text-[10px] text-gray-600 font-bold uppercase tracking-wider'>Bookmarked on {item.date}</span>
                            <ChevronRight className='size-4 text-gray-700' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Bookmarks

