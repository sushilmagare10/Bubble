import React from 'react'
import { Textarea } from '../ui/textarea'
import Image from 'next/image'
import { FaSquarePollHorizontal } from "react-icons/fa6";
import { MdInsertPhoto } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { BsCalendar2EventFill } from "react-icons/bs";


const AddPost = () => {
    return (
        <div className=' bg-card flex rounded-lg shadow-xl p-4 flex-col border justify-center items-start gap-4'>
            <p className=' font-semibold text-gray-600 self-start text-sm'>Add Post</p>
            <div className=' flex gap-4 w-full justify-between items-center -mt-1'>
                <Textarea placeholder='What&apos;s on your mind?' />
                <Image
                    src='/emoji.png'
                    alt='emoji'
                    width={20}
                    height={20}
                    className="w-5 h-5 cursor-pointer self-end"
                />
            </div>
            <div className=' flex justify-between items-center gap-8'>
                <div className=' flex justify-center items-center gap-2 cursor-pointer'>
                    <span className='font-semibold text-gray-600'>
                        Photo
                    </span>
                    <MdInsertPhoto className=' text-blue-500 text-xl' />
                </div>
                <div className=' flex justify-center items-center gap-2 cursor-pointer'>
                    <span className='font-semibold text-gray-600'>
                        Video
                    </span>
                    <GoVideo className=' text-rose-500 text-xl' />
                </div>
                <div className=' flex justify-center items-center gap-2 cursor-pointer'>
                    <span className='font-semibold text-gray-600'>
                        Poll
                    </span>
                    <FaSquarePollHorizontal className=' text-green-500 text-xl' />
                </div>
                <div className=' flex justify-center items-center gap-2 cursor-pointer'>
                    <span className='font-medium'>
                        Event
                    </span>
                    <BsCalendar2EventFill className=' text-fuchsia-500 text-xl' />
                </div>
            </div>
        </div>
    )
}

export default AddPost