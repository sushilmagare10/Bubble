"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "../client"

export const getMyFriends = async () => {
    const { userId: currentUserId } = auth()

    if (!currentUserId) {
        throw new Error("User not authenticated")
    }

    try {
        // Get users that the current user is following
        const following = await prisma.follower.findMany({
            where: {
                followerId: currentUserId
            },
            include: {
                following: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        lastname: true,
                        avatar: true,
                        _count: {
                            select: {
                                followers: true,
                                followings: true,
                                posts: true
                            }
                        }
                    }
                }
            }
        })

        return following.map(f => ({
            ...f.following,
            followersCount: f.following._count.followers,
            followingCount: f.following._count.followings,
            postsCount: f.following._count.posts
        }))

    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong")
    }
}

export const getUserFriends = async (userId: string) => {
    const { userId: currentUserId } = auth()

    if (!currentUserId) {
        throw new Error("User not authenticated")
    }

    try {
        // Get users that the specified user is following
        const following = await prisma.follower.findMany({
            where: {
                followerId: userId
            },
            include: {
                following: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        lastname: true,
                        avatar: true,
                        followers: {
                            where: {
                                followerId: currentUserId
                            }
                        },
                        followRequestReceived: {
                            where: {
                                senderId: currentUserId
                            }
                        },
                        _count: {
                            select: {
                                followers: true,
                                followings: true,
                                posts: true
                            }
                        }
                    }
                }
            }
        })

        // Get blocked user IDs (both ways)
        const blockedUsers = await prisma.block.findMany({
            where: {
                OR: [
                    { blockerId: currentUserId },
                    { blockedId: currentUserId }
                ]
            },
            select: {
                blockerId: true,
                blockedId: true
            }
        })

        const blockedUserIds = new Set([
            ...blockedUsers.map(b => b.blockerId),
            ...blockedUsers.map(b => b.blockedId)
        ])

        // Filter out blocked users and current user
        const filteredFollowing = following.filter(f => 
            !blockedUserIds.has(f.following.id) && f.following.id !== currentUserId
        )

        return filteredFollowing.map(f => ({
            ...f.following,
            isFollowing: f.following.followers.length > 0,
            hasPendingRequest: f.following.followRequestReceived.length > 0,
            followersCount: f.following._count.followers,
            followingCount: f.following._count.followings,
            postsCount: f.following._count.posts
        }))

    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong")
    }
}

export const getFollowRequests = async () => {
    const { userId: currentUserId } = auth()

    if (!currentUserId) {
        throw new Error("User not authenticated")
    }

    try {
        const followRequests = await prisma.followRequest.findMany({
            where: {
                receiverId: currentUserId
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        lastname: true,
                        avatar: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return followRequests

    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong")
    }
}