"use client"

import React, { useOptimistic, useState } from 'react'
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import { useAuth } from '@clerk/nextjs';
import { switchLike } from '@/lib/actions/switchLike';
import { Button } from '../ui/button';

const PostInteraction = ({
    postId,
    likes,
    commentNumber
}: {
    postId: number,
    likes: string[],
    commentNumber: number
}) => {
    const { userId } = useAuth()

    const [likesState, setLikesState] = useState({
        likeCount: likes.length,
        isLiked: userId ? likes.includes(userId) : false
    })

    const [optimisticLike, switchOptimistiLike] = useOptimistic(
        likesState, 
        (state) => ({
            likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
            isLiked: !state.isLiked
        })
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
            console.error('Failed to toggle like:', error)
        }
    }

    return (
        <div className="flex items-center justify-between px-6 py-3 border-t border-border/70 ">
            <div className="flex items-center gap-4">
                {/* Like Button */}
                <div className="flex items-center gap-3 bg-muted/30 rounded-full px-4 py-2">
                    <form action={likeAction}>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-auto p-0 hover:bg-transparent"
                        >
                            {optimisticLike.isLiked ? (
                                <FaHeart className="w-4 h-4 text-red-500" />
                            ) : (
                                <FaRegHeart className="w-4 h-4 text-muted-foreground hover:text-red-500 transition-colors" />
                            )}
                        </Button>
                    </form>
                    <div className="w-px h-4 bg-border" />
                    <span className="text-sm text-muted-foreground">
                        {optimisticLike.likeCount}
                        <span className="hidden md:inline ml-1">Likes</span>
                    </span>
                </div>

                {/* Comment Button */}
                <div className="flex items-center gap-3 bg-muted/30 rounded-full px-4 py-2">
                    <FaRegComment className="w-4 h-4 text-muted-foreground" />
                    <div className="w-px h-4 bg-border" />
                    <span className="text-sm text-muted-foreground">
                        {commentNumber}
                        <span className="hidden md:inline ml-1">Comments</span>
                    </span>
                </div>
            </div>

            {/* Share Button */}
            <div className="flex items-center gap-3 bg-muted/30 rounded-full px-4 py-2">
                <BsFillSendFill className="w-4 h-4 text-muted-foreground" />
                <div className="w-px h-4 bg-border" />
                <span className="text-sm text-muted-foreground">
                    41
                    <span className="hidden md:inline ml-1">Shares</span>
                </span>
            </div>
        </div>
    )
}

export default PostInteraction