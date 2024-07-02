import Image from 'next/image'
import React from 'react'
import { Input } from '../ui/input'
import { MdMoreHoriz } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa6";


const Comments = () => {
    return (
        <>
            <div className=' flex justify-between items-center p-4 gap-4'>
                <Image
                    src='/profile3.png'
                    alt='ProfilePic'
                    width={36}
                    height={36}
                    className='w-9 h-9 object-cover rounded-full'
                />
                <div className='flex-1 flex items-center justify-between bg-secondary rounded-full text-sm px-6  w-full'>
                    <Input
                        type='text'
                        placeholder='Write a comment...'
                        className='bg-transparent outline-none flex-1 ring-0 border-none focus-visible:ring-none'
                    />
                    <Image
                        src="/emoji.png"
                        alt=""
                        width={16}
                        height={16}
                        className="cursor-pointer"
                    />
                </div>
            </div>
            <div className=' flex justify-between gap-4 p-4 -mt-4'>
                <Image
                    src='/profile3.png'
                    alt='ProfilePic'
                    width={44}
                    height={44}
                    className='w-11 h-11 object-cover rounded-full'
                />
                <div className=' flex flex-col justify-center gap-2 text-gray-700'>
                    <div className=' w-full flex justify-between items-center'>
                        <span className=' text-base font-semibold self-start'>John Doe</span>
                        <MdMoreHoriz className='text-xl' />
                    </div>
                    <p className='text-xs font-medium'>
                        Donec sit amet efficitur ante. Sed semper finibus malesuada. Sed non dolor nibh. Donec sit amet efficitur ante. Sed semper finibus malesuada. Sed non dolor nibh.
                    </p>
                    <div className=' flex justify-start text-xs items-center gap-4'>
                        <div className=' flex items-center gap-4 bg-secondary py-1 px-3 rounded-full'>
                            <FaRegHeart className=' fill-primary' />
                            <span className='text-gray-300'>|</span>
                            <span className=' text-gray-600'>87<span className=' hidden md:inline ml-2'>Likes</span></span>
                        </div>
                        <p className='text-gray-600 font-medium'>Replay</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comments