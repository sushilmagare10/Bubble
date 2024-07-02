import Link from 'next/link'
import React from 'react'
import { IoLocation } from "react-icons/io5";
import { MdWork, MdCalendarMonth } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { Button } from '../ui/button';


const UserInfoCard = ({ userId }: { userId: string }) => {
    return (
        <div className=' flex flex-col justify-between items-center p-4 gap-5 bg-card border rounded-lg'>
            <div className=' flex w-full justify-between items-center'>
                <span className=' text-gray-400 font-semibold text-xs'>User Information</span>
                <Link href='/seeAll' className=' text-primary text-xs'>
                    see all
                </Link>
            </div>
            <div className=' flex flex-col w-full gap-4'>
                <div className=' flex justify-start items-center gap-2'>
                    <p className=' text-xl text-gray-800 font-bold'>John Doe</p>
                    <p className=' text-sm font-medium text-gray-400'>@johndoe</p>
                </div>
                <p className=' text-gray-400 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className='flex flex-col w-full justify-center text-sm items-start gap-2'>
                    <div className=' flex justify-start text-gray-400 items-center gap-2'>
                        <IoLocation />
                        Living in
                        <span className='text-gray-800 font-bold'>India</span>
                    </div>
                    <div className=' flex justify-start text-gray-400 items-center gap-2'>
                        <FaGraduationCap />
                        Went to
                        <span className='text-gray-800 font-bold'>High School</span>
                    </div>
                    <div className=' flex justify-start text-gray-400 items-center gap-2'>
                        <MdWork />
                        Working at
                        <span className='text-gray-800 font-bold'>FreeLancer</span>
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-between items-center text-sm'>
                <Link href='/' className=' flex justify-between items-center gap-2 font-medium text-primary'>
                    <FaLink className=' fill-gray-400' />
                    John.Link
                </Link>
                <div className=' flex justify-between items-center gap-2 font-medium text-gray-600'>
                    <MdCalendarMonth className='fill-gray-400' />
                    joined December 2024
                </div>
            </div>
            <Button className='w-full'>Follow</Button>
            <span className=' text-red-500 self-end font-medium text-xs cursor-pointer -mt-2'>Block User</span>
        </div>
    )
}

export default UserInfoCard