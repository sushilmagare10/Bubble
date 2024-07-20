"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "../client"

export const acceptFollowRequest = async (userId: string) => {

    const { userId: currentUserId } = auth()

    if (!currentUserId) {
        throw new Error("User not Authenticated")
    }

    try {

        const existingFollowRequest = await prisma.followRequest.findFirst({
            where: {
                senderId: userId,
                receiverId: currentUserId
            }
        })

        if (existingFollowRequest) {
            await prisma.followRequest.delete({
                where: {
                    id: existingFollowRequest.id
                }
            })

            await prisma.follower.create({
                data: {
                    followerId: userId,
                    followingId: currentUserId
                }
            })

            const user = await prisma.user.findUnique({
                where: { id: currentUserId },
                select: {
                    username: true,
                    avatar: true
                }
            })

            if (user) {
                await prisma.notification.create({
                    data: {
                        type: "FOLLOW_ACCEPTED",
                        avatar: user?.avatar,
                        content: user?.username,
                        msg: "accepted your follow request",
                        userId: userId
                    }
                })
            } else {
                throw new Error("Something went wrong!")

            }

        }
    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong")
    }

}