import Image from 'next/image'
import React from 'react'
import { MdMoreHoriz } from "react-icons/md";

const Post = () => {
    return (
        <div className=' flex w-full flex-col gap-4 '>
            <div className='w-full flex justify-between items-center p-2'>
                <div className='flex justify-between items-center gap-4'>
                    <Image
                        src='/profile3.png'
                        alt='ProfilePic'
                        width={56}
                        height={56}
                        className=' rounded-full object-cover w-14 h-14 '
                    />
                    <span className=' text-xl font-semibold text-gray-600'>
                        John Doe
                    </span>
                </div>
                <MdMoreHoriz className='text-2xl' />
            </div>
            <div className=' flex flex-col gap-4'>
                <div className=' relative min-h-96 w-full'>
                    <Image
                        src='/coding.jpg'
                        alt='post'
                        fill
                        className=' object-cover rounded-lg'
                    />
                </div>
                <p className='text-gray-500 text-sm '>
                    Donec sit amet efficitur ante. Sed semper finibus malesuada. Sed non dolor nibh. Donec sit amet efficitur ante. Sed semper finibus malesuada. Sed non dolor nibh.
                </p>
            </div>
            <div className=' flex justify-between items-center'>

            </div>
        </div>
    )
}

export default Post