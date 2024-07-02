import React from 'react'
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";

const PostInteraction = () => {
    return (
        <div className=' flex justify-between items-center text-sm my-4 font-medium'>
            <div className=' flex justify-between items-center gap-8'>
                <div className=' flex items-center gap-4 bg-secondary py-2 px-4 rounded-full'>
                    <FaRegHeart className=' fill-primary' />
                    <span className='text-gray-300'>|</span>
                    <span className=' text-gray-600'>87<span className=' hidden md:inline ml-2'>Likes</span></span>
                </div>
                <div className=' flex justify-between items-center gap-8'>
                    <div className=' flex items-center gap-4 bg-secondary py-2 px-4 rounded-full'>
                        <FaRegComment className=' fill-primary' />
                        <span className='text-gray-300'>|</span>
                        <span className=' text-gray-600'>23<span className=' hidden md:inline ml-2'>Comments</span></span>
                    </div>
                </div>
            </div>
            <div className=' flex justify-between items-center gap-8'>
                <div className=' flex items-center gap-4 bg-secondary py-2 px-4 rounded-full'>
                    <BsFillSendFill className=' fill-primary' />
                    <span className='text-gray-300'>|</span>
                    <span className=' text-gray-600'>41<span className=' hidden md:inline ml-2'>Shares</span></span>
                </div>
            </div>
        </div>
    )
}

export default PostInteraction