"use server"

import { auth } from "@clerk/nextjs/server"
import { z } from 'zod'
import prisma from "../client"
import { revalidatePath } from "next/cache"


export const addPost = async (formData: FormData, img: string) => {

    const desc = formData.get("description") as string
    const { userId } = auth()

    if (!userId) {
        throw new Error("User is not Authenticated!")
    }

    const Desc = z.string().min(1).max(300)
    const validateDescResult = Desc.safeParse(desc)

    if (!validateDescResult.success) {
        // Handle validation error
        console.error(validateDescResult.error)
        return { success: false, error: "Invalid description" }
    }

    try {
        await prisma.post.create({
            data: {
                description: validateDescResult.data,
                userId,
                img
            }
        })
        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong!")
    }

}