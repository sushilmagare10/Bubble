import Image from 'next/image'
import React from 'react'


const StoryItem = () => {
    return (
        <>
            <div className=' relative flex flex-col items-center gap-2 cursor-pointer'>
                <Image
                    src='/Profile.jpg'
                    alt='stories'
                    className=' rounded-full object-cover w-20 h-20'
                    width={80}
                    height={80}
                />
                <span className=' font-medium'>
                    Add Story
                </span>
            </div>
            <div className='flex flex-col items-center gap-2 cursor-pointer'>
                <Image
                    src='/profile3.png'
                    alt='stories'
                    className=' rounded-full object-cover w-20 h-20'
                    width={80}
                    height={80}
                />
                <p>John Doe</p>
            </div>
            <div className='flex flex-col items-center gap-2 cursor-pointer'>
                <Image
                    src='/profile2.jpg'
                    alt='stories'
                    className=' rounded-full object-cover w-20 h-20'
                    width={80}
                    height={80}
                />
                <p>John Doe</p>
            </div>
            <div className='flex flex-col items-center gap-2 cursor-pointer'>
                <Image
                    src='/banner.jpg'
                    alt='stories'
                    className=' rounded-full object-cover w-20 h-20'
                    width={80}
                    height={80}
                />
                <p>John Doe</p>
            </div>
            <div className='flex flex-col items-center gap-2 cursor-pointer'>
                <Image
                    src='/profile2.jpg'
                    alt='stories'
                    className=' rounded-full object-cover w-20 h-20'
                    width={80}
                    height={80}
                />
                <p>John Doe</p>
            </div>
            <div className='flex flex-col items-center gap-2 cursor-pointer'>
                <Image
                    src='/Profile.jpg'
                    alt='stories'
                    className=' rounded-full object-cover w-20 h-20'
                    width={80}
                    height={80}
                />
                <p>John Doe</p>
            </div>
            <div className='flex flex-col items-center gap-2 cursor-pointer'>
                <Image
                    src='/profile3.png'
                    alt='stories'
                    className=' rounded-full object-cover w-20 h-20'
                    width={80}
                    height={80}
                />
                <p>John Doe</p>
            </div>
        </>
    )
}

export default StoryItem