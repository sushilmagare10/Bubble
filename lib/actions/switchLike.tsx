"use server"

import { auth } from "@clerk/nextjs/server";
import prisma from "../client";

export const switchLike = async (postId: number) => {
    const { userId } = auth();

    if (!userId) throw new Error("User is not authenticated!");

    try {
        const existingLike = await prisma.like.findFirst({
            where: {
                postId,
                userId,
            },
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            });
        } else {
            await prisma.like.create({
                data: {
                    postId,
                    userId,
                },
            });

            const post = await prisma.post.findUnique({
                where: { id: postId },
                include: { user: true }
            });

            if (post && post.userId !== userId) {
                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    select: {
                        username: true,
                        avatar: true
                    }
                });

                if (user) {
                    await prisma.notification.create({
                        data: {
                            type: "LIKE",
                            avatar: user.avatar,
                            content: user.username,
                            msg: "liked your post",
                            userId: post.userId
                        }
                    });
                } else {
                    throw new Error("Something went wrong!")
                }
            }
        }
    } catch (err) {
        console.log(err);
        throw new Error("Something went wrong");
    }
};