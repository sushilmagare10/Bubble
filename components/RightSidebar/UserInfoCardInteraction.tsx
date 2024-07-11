"use client"

import React, { useOptimistic, useState } from 'react'
import { Button } from '../ui/button';
import { switchFollow } from '@/lib/actions/switchFollow';
import { switchBlock } from '@/lib/actions/switchBlock';

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

    const [userState, setUserState] = useState({
        following: isFollowing,
        blocked: isUserBlocked,
        followingRequestSent: isFollowingSent
    })

    const follow = async () => {
        switchOptimisticState('follow')
        try {
            await switchFollow(userId)
            setUserState(prev => ({
                ...prev,
                following: prev.following && false,
                followingRequestSent: !prev.following && !prev.followingRequestSent ? true : false
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const block = async () => {
        switchOptimisticState('block')

        try {
            await switchBlock(userId)
            setUserState(prev => ({
                ...prev,
                blocked: !prev.blocked
            }))
        } catch (error) {
            console.log(error)
        }

    }

    //useOptimistic Hook
    const [optimisticState, switchOptimisticState] = useOptimistic(
        userState, (state, value: "follow" | "block") => value === "follow" ? {
            ...state,
            following: state.following && false,
            followingRequestSent: !state.following && !state.followingRequestSent ? true : false
        } : {
            ...state,
            blockde: !state.blocked
        }
    )

    return (
        <>
            <form action={follow} className=' w-full flex justify-center flex-col gap-2'>
                <Button className='w-full font-semibold text-white'>
                    {
                        optimisticState.following
                            ? "Following"
                            : optimisticState.followingRequestSent
                                ? "Request Send"
                                : "Follow"
                    }
                </Button>
            </form>
            <form action={block} className=' self-end'>
                <Button className=' bg-transparent hover:bg-white'>
                    <span className=' text-red-400 text-end cursor-pointer text-sm'>
                        {optimisticState.blocked ? "Unblock User" : "Block User"}
                    </span>
                </Button>
            </form>
        </>
    )
}

export default UserInfoCardInteraction