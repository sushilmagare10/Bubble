import Image from 'next/image'
import React from 'react'
import { MdMoreHoriz } from "react-icons/md";

const Ad = () => {
    return (
        <div className=' flex w-full flex-col gap-4 bg-card shadow-xl rounded-lg p-4 border'>
            <div className='w-full flex flex-col gap-3 justify-between items-center'>
                <div className='flex w-full justify-between items-center gap-4'>
                    <span className=' text-sm font-semibold text-gray-500'>
                        Sponsored Ad
                    </span>
                    <MdMoreHoriz className='text-2xl' />
                </div>
                <span className='flex justify-center items-center text-lg font-semibold text-gray-700 w-full min-h-40 bg-slate-100 rounded-lg'>
                    Ad Image
                </span>
            </div>
            <div className='text-sm text-gray-500'>
                Donec sit amet efficitur ante. Sed semper finibus malesuada. Sed non dolor nibh.
            </div>
        </div>
    )
}

export default Ad