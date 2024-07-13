"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "../client"

export const switchLike = async (postId: number) => {

    const { userId } = auth()

    if (!userId) {
        throw new Error("User is not Authenticated!")
    }

    try {
        const existingLike = await prisma.like.findFirst({
            where: {
                postId,
                userId
            }
        })

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            })
        } else {
            await prisma.like.create({
                data: {
                    postId,
                    userId
                }
            })
        }
    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong!")
    }
}