"use client"

import React, { useOptimistic, useState } from 'react'
import { Button } from '../ui/button';
import { switchFollow } from '@/lib/actions/switchFollow';
import { switchBlock } from '@/lib/actions/switchBlock';
import { UserPlus, UserMinus, Shield, ShieldOff } from 'lucide-react';

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

    const [optimisticState, switchOptimisticState] = useOptimistic(
        userState, 
        (state, value: "follow" | "block") => value === "follow" ? {
            ...state,
            following: state.following && false,
            followingRequestSent: !state.following && !state.followingRequestSent ? true : false
        } : {
            ...state,
            blocked: !state.blocked
        }
    )

    const getFollowButtonConfig = () => {
        if (optimisticState.following) {
            return { 
                text: "Following", 
                icon: UserMinus, 
                variant: "outline" as const,
                className: "border-border/50 hover:border-red-200 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
            }
        }
        if (optimisticState.followingRequestSent) {
            return { 
                text: "Request Sent", 
                icon: UserPlus, 
                variant: "outline" as const,
                className: "border-border/50"
            }
        }
        return { 
            text: "Follow", 
            icon: UserPlus, 
            variant: "default" as const,
            className: ""
        }
    }

    const followConfig = getFollowButtonConfig()
    const FollowIcon = followConfig.icon

    return (
        <div className="space-y-3 w-full">
            <form action={follow}>
                <Button 
                    variant={followConfig.variant}
                    className={`w-full ${followConfig.className}`}
                >
                    <FollowIcon className="w-4 h-4 mr-2" />
                    {followConfig.text}
                </Button>
            </form>
            
            <form action={block}>
                <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                    {optimisticState.blocked ? (
                        <>
                            <ShieldOff className="w-4 h-4 mr-2" />
                            Unblock User
                        </>
                    ) : (
                        <>
                            <Shield className="w-4 h-4 mr-2" />
                            Block User
                        </>
                    )}
                </Button>
            </form>
        </div>
    )
}

export default UserInfoCardInteraction