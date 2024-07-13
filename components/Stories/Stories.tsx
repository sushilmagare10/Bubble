import Image from 'next/image'
import React from 'react'
import StoryItem from './StoryItem'
import { Card } from '../ui/card'

const Stories = () => {
    return (
        <Card className='p-4 bg-card rounded-lg border dark:border-white/40 overflow-scroll text-xs scrollbar-hide'>
            <div className='flex gap-8 w-max'>
                <StoryItem />
            </div>
        </Card>
    )
}

export default Stories