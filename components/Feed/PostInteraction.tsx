"use client"


import React, { useOptimistic, useState } from 'react'
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import { useAuth } from '@clerk/nextjs';
import { switchLike } from '@/lib/actions/switchLike';

const PostInteraction = (
    {
        postId,
        likes,
        commentNumber
    }: {
        postId: number,
        likes: string[],
        commentNumber: number
    }) => {

    const { userId, isLoaded } = useAuth()

    const [likesState, setLikesState] = useState({
        likeCount: likes.length,
        isLiked: userId ? likes.includes(userId) : false
    })

    const [optimisticLike, switchOptimistiLike] = useOptimistic(
        likesState, (state, value) => {
            return {
                likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
                isLiked: !state.isLiked
            }
        }
    )

    const likeAction = async () => {
        switchOptimistiLike("")
        try {
            switchLike(postId)
            setLikesState((state) => ({
                likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
                isLiked: !state.isLiked
            }))
        } catch (error) {

        }
    }

    return (
        <div className=' flex justify-between items-center text-sm my-4 px-4 font-medium'>
            <div className=' flex justify-between items-center gap-8'>
                <div className=' flex items-center gap-4 bg-secondary py-2 px-4 rounded-full'>
                    <form action={likeAction}>
                        <button>

                            {
                                optimisticLike.isLiked ?
                                    <FaHeart className='fill-primary' /> :
                                    <FaRegHeart className=' fill-primary' />
                            }
                        </button>
                    </form>
                    <span className='text-gray-300'>|</span>
                    <span className=' text-gray-500'>{optimisticLike.likeCount}<span className=' hidden md:inline ml-2'>Likes</span></span>
                </div>
                <div className=' flex justify-between items-center gap-8'>
                    <div className=' flex items-center gap-4 bg-secondary py-2 px-4 rounded-full'>
                        <FaRegComment className=' fill-primary' />
                        <span className='text-gray-300'>|</span>
                        <span className=' text-gray-500'>23<span className=' hidden md:inline ml-2'>Comments</span></span>
                    </div>
                </div>
            </div>
            <div className=' flex justify-between items-center gap-8'>
                <div className=' flex items-center gap-4 bg-secondary py-2 px-4 rounded-full'>
                    <BsFillSendFill className=' fill-primary' />
                    <span className='text-gray-300'>|</span>
                    <span className=' text-gray-500'>41<span className=' hidden md:inline ml-2'>Shares</span></span>
                </div>
            </div>
        </div>
    )
}

export default PostInteraction