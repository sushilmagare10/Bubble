"use server"

import { z } from 'zod'
import prisma from '../client'
import { auth } from '@clerk/nextjs/server'

export const updateProfile = async (
    prevState: { success: boolean; error: boolean },
    payload: { formData: FormData; cover: string }
) => {


    const { formData, cover } = payload;
    const fields = Object.fromEntries(formData)

    const filterFields = Object.fromEntries(
        Object.entries(fields).filter(([_, value]) => value !== '')
    )

    console.log(fields)

    const Profile = z.object({
        cover: z.string().optional(),
        name: z.string().max(60).optional(),
        lastname: z.string().max(60).optional(),
        descrpition: z.string().max(255).optional(),
        work: z.string().max(60).optional(),
        website: z.string().max(60).optional(),
        school: z.string().max(60).optional(),
        city: z.string().max(60).optional(),
    })

    const validatedFeilds = Profile.safeParse({ cover, ...filterFields })

    if (!validatedFeilds.success) {
        console.log(validatedFeilds.error.flatten().fieldErrors)
        return { success: false, error: true };
    }


    const { userId } = auth()

    if (!userId) {
        return { success: false, error: true };
    }


    try {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: validatedFeilds.data
        })
        return { success: true, error: false };
    } catch (error) {
        console.log(error)
        return { success: false, error: true };
    }
}