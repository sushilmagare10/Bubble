import React from 'react'
import { Textarea } from '../ui/textarea'
import Image from 'next/image'
import { FaSquarePollHorizontal } from "react-icons/fa6";
import { MdInsertPhoto } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { BsCalendar2EventFill } from "react-icons/bs";
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';


const AddPost = () => {
    return (
        <Card className=' flex rounded-lg  p-4 dark:border-white/40 flex-col border justify-center items-start gap-4'>
            <CardTitle className=' font-semibold self-start text-sm'>Add Post</CardTitle>
            <CardContent className=' flex gap-4 p-0 w-full justify-between items-center -mt-1'>
                <Textarea rows={4} className='rounded-lg' placeholder='What&apos;s on your mind?' />
                <Image
                    src='/emoji.png'
                    alt='emoji'
                    width={20}
                    height={20}
                    className="w-5 h-5 cursor-pointer self-end"
                />
            </CardContent>
            <CardContent className=' flex justify-between p-0 items-center gap-8'>
                <div className=' flex justify-center items-center gap-2 cursor-pointer'>
                    <CardDescription className='font-semibold'>
                        Photo
                    </CardDescription>
                    <MdInsertPhoto className=' text-blue-500 text-xl' />
                </div>
                <div className=' flex justify-center items-center gap-2 cursor-pointer'>
                    <CardDescription className='font-semibold'>
                        Video
                    </CardDescription>
                    <FaYoutube className=' text-rose-500 text-xl' />
                </div>
                <div className=' flex justify-center items-center gap-2 cursor-pointer'>
                    <CardDescription className='font-semibold'>
                        Poll
                    </CardDescription>
                    <FaSquarePollHorizontal className=' text-green-500 text-xl' />
                </div>
                <div className=' flex justify-center items-center gap-2 cursor-pointer'>
                    <CardDescription className='font-medium'>
                        Event
                    </CardDescription>
                    <BsCalendar2EventFill className=' text-fuchsia-500 text-xl' />
                </div>
            </CardContent>
        </Card>
    )
}

export default AddPost