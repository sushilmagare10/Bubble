"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "../client"


export const addComment = async (postId: number, description: string) => {

    const { userId } = auth()

    if (!userId) {
        throw new Error("User not Authenticated")
    }

    try {
        const createdComment = await prisma.comment.create({
            data: {
                desc,
                userId,
                postId
            },
            include: {
                user: true
            }
        })
        return createdComment
    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong")
    }
}