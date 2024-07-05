import Link from 'next/link'
import React from 'react'
import { MdInsertPhoto } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { BsSave2Fill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";

const LeftSidebarNav = () => {
    return (
        <div className=' flex flex-col justify-center items-start gap-6 py-4 bg-card border rounded-lg shadow-xl'>
            <Link href='/posts' className='flex justify-around items-center gap-3 ml-6'>
                <MdInsertPhoto className='text-blue-500 text-xl' />
                <p className='text-sm font-medium'>My Posts</p>
            </Link>
            <Link href='/videos' className='flex justify-between items-center gap-3 ml-6'>
                <FaYoutube className=' text-rose-500 text-xl' />
                <p className='text-sm font-medium'>Videos</p>
            </Link>
            <Link href='/pages' className='flex justify-between items-center gap-3 ml-6'>
                <BsSave2Fill className=' text-green-500 text-lg ' />
                <p className='text-sm font-medium'>Saved</p>
            </Link>
            <Link href='/setting' className='flex justify-between items-center gap-3 ml-6'>
                <IoSettings className='text-rose-500 text-xl' />
                <p className='text-sm font-medium'>Setting</p>
            </Link>

        </div>
    )
}

export default LeftSidebarNav