"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "../client"


export const declineFollowRequest = async (userId: string) => {

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
        }
    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong")
    }

}