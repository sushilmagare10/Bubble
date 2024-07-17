"use server"

import { auth } from "@clerk/nextjs/server";
import prisma from "../client";


export const addStory = async (img: string) => {
    const { userId } = auth();

    if (!userId) throw new Error("User is not authenticated!");

    try {
        const existingStory = await prisma.story.findFirst({
            where: {
                userId,
            },
        });

        if (existingStory) {
            await prisma.story.delete({
                where: {
                    id: existingStory.id,
                },
            });
        }
        const createdStory = await prisma.story.create({
            data: {
                userId,
                img,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            },
            include: {
                user: true,
            },
        });

        return createdStory;
    } catch (err) {
        console.log(err);
    }
};
