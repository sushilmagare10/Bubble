import Link from 'next/link'
import React from 'react'
import { MdInsertPhoto } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { MdOutlineContactPage } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";


const LeftSidebarNav = () => {
    return (
        <div className=' flex flex-col justify-center items-start gap-6 py-4 bg-card rounded-lg shadow-xl'>
            <Link href='/posts' className='flex justify-around items-center gap-3 ml-6'>
                <MdInsertPhoto className='text-blue-500 text-xl' />
                <p className='text-sm font-medium'>My Posts</p>
            </Link>
            <Link href='/videos' className='flex justify-between items-center gap-3 ml-6'>
                <GoVideo className=' text-rose-500 text-xl' />
                <p className='text-sm font-medium'>Videos</p>
            </Link>
            <Link href='/pages' className='flex justify-between items-center gap-3 ml-6'>
                <MdOutlineContactPage className=' text-green-500 text-xl ' />
                <p className='text-sm font-medium'>Pages</p>
            </Link>
            <Link href='/setting' className='flex justify-between items-center gap-3 ml-6'>
                <IoSettingsOutline className='text-fuchsia-500 text-xl' />
                <p className='text-sm font-medium'>Setting</p>
            </Link>

        </div>
    )
}

export default LeftSidebarNav