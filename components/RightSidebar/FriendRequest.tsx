import Image from 'next/image'
import React from 'react'
import { FaCheck } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";


const FriendRequest = () => {
    return (
        <div className=' flex flex-col justify-between w-full items-center bg-card gap-4 rounded-lg shadow-xl p-4'>
            <div className=' flex w-full justify-between items-center text-sm font-medium p-2'>
                <p className='text-gray-500'>Friend Requests</p>
                <span className=' text-primary '>See All</span>
            </div>
            <div className=' w-full h-full flex justify-between items-center text-lg gap-2 font-medium '>
                <div className=' flex justify-between items-center gap-2'>
                    <Image
                        src='/profile2.jpg'
                        alt='profilePic'
                        width={56}
                        height={56}
                        className=' object-cover w-14 h-14 ring-1 ring-white rounded-full'
                    />
                    <p>John Doe</p>
                </div>
                <div className=' flex justify-between items-center gap-4'>
                    <span className='flex justify-center items-center w-6 h-6 rounded-full bg-primary hover:bg-primary/90 cursor-pointer'><FaCheck className=' text-white text-sm' /></span>
                    <span className='flex justify-center items-center w-6 h-6 rounded-full bg-neutral-300 hover:bg-neutral-300/90 cursor-pointer'><IoIosClose className=' text-white text-xl' /></span>
                </div>
            </div>
            <div className=' w-full flex justify-between items-center text-lg font-medium '>
                <div className=' flex justify-between items-center gap-2'>
                    <Image
                        src='/Profile.jpg'
                        alt='profilePic'
                        width={56}
                        height={56}
                        className=' object-cover w-14 h-14 ring-1 ring-white rounded-full'
                    />
                    <p>John Doe</p>
                </div>
                <div className=' flex justify-between items-center gap-4'>
                    <span className='flex justify-center items-center w-6 h-6 rounded-full bg-primary hover:bg-primary/90 cursor-pointer'><FaCheck className=' text-white text-sm' /></span>
                    <span className='flex justify-center items-center w-6 h-6 rounded-full bg-neutral-300 hover:bg-neutral-300/90 cursor-pointer'><IoIosClose className=' text-white text-xl' /></span>
                </div>
            </div>
            <div className=' w-full flex justify-between items-center text-lg font-medium '>
                <div className=' flex justify-between items-center gap-2'>
                    <Image
                        src='/profile3.png'
                        alt='profilePic'
                        width={56}
                        height={56}
                        className=' object-cover w-14 h-14 ring-1 ring-white rounded-full'
                    />
                    <p>John Doe</p>
                </div>
                <div className=' flex justify-between items-center gap-4'>
                    <span className='flex justify-center items-center w-6 h-6 rounded-full bg-primary hover:bg-primary/90 cursor-pointer'><FaCheck className=' text-white text-sm' /></span>
                    <span className='flex justify-center items-center w-6 h-6 rounded-full bg-neutral-300 hover:bg-neutral-300/90 cursor-pointer'><IoIosClose className=' text-white text-xl' /></span>
                </div>
            </div>
        </div>
    )
}

export default FriendRequest