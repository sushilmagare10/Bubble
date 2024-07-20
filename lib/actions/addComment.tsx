"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "../client"


export const addComment = async (postId: number, desc: string) => {

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
                user: true,
                post: {
                    select: {
                        userId: true
                    }
                }
            }
        })

        await prisma.notification.create({
            data: {
                type: "COMMENT",
                avatar: createdComment.user.avatar,
                content: createdComment.user.username,
                msg: "commented on your post",
                userId: createdComment.post.userId
            }
        })

        return createdComment
    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong")
    }
}