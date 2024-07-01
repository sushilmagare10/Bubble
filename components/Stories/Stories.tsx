import Image from 'next/image'
import React from 'react'
import StoryItem from './StoryItem'

const Stories = () => {
    return (
        <div className='p-4 bg-card rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide'>
            <div className='flex gap-8 w-max'>
                <StoryItem />
            </div>
        </div>
    )
}

export default Stories