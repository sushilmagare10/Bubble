"use server"

import { auth } from "@clerk/nextjs/server";
import prisma from "../client";


export const switchFollow = async (userId: string) => {
    const { userId: currentUserId } = auth()

    if (!currentUserId) {
        throw new Error("User not authenticated")
    }
    try {
        const existingFollow = await prisma.follower.findFirst({
            where: {
                followerId: currentUserId,
                followingId: userId
            }
        });

        if (existingFollow) {
            await prisma.follower.delete({
                where: {
                    id: existingFollow.id
                }
            })
        } else {
            const existingFollowRequest = await prisma.followRequest.findFirst({
                where: {
                    senderId: currentUserId,
                    receiverId: userId
                }
            })

            if (existingFollowRequest) {
                await prisma.followRequest.delete({
                    where: {
                        id: existingFollowRequest.id
                    }
                })
            } else {
                await prisma.followRequest.create({
                    data: {
                        senderId: currentUserId,
                        receiverId: userId
                    }
                })

                const user = await prisma.user.findUnique({
                    where: {
                        id: currentUserId
                    },
                    select: {
                        username: true,
                        avatar: true
                    }
                })


                if (user) {
                    await prisma.notification.create({
                        data: {
                            type: "FOLLOW_REQUEST",
                            avatar: user?.avatar,
                            content: user?.username,
                            msg: "sent you a follow request",
                            userId: userId
                        }
                    })
                } else {
                    throw new Error("Something went wrong!")
                }
            }
        }
        return { success: true }
    } catch (error) {
        console.log(error)
        throw new Error("something went wrong!")
    }
}
