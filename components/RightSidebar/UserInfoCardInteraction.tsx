"use client"

import React from 'react'
import { Button } from '../ui/button';

const UserInfoCardInteraction = ({
    userId,
    isUserBlocked,
    isFollowing,
    isFollowingSent,
}: {
    userId: string;
    isUserBlocked: boolean;
    isFollowing: boolean;
    isFollowingSent: boolean;
}) => {
    return (
        <div className=' w-full flex justify-center flex-col gap-2'>
            <Button className='w-full font-semibold text-white'>
                {
                    isFollowing
                        ? "Following"
                        : isFollowingSent
                            ? "Request Send"
                            : "Follow"
                }
            </Button>
            <span className=' text-red-400 text-end cursor-pointer text-sm'>
                {isUserBlocked ? "Unblock User" : "Block User"}
            </span>
        </div>
    )
}

export default UserInfoCardInteraction