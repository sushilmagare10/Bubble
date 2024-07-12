"use server"

import { z } from 'zod'
import prisma from '../client'
import { auth } from '@clerk/nextjs/server'

export const updateProfile = async (formData: FormData, cover: string) => {

    const { userId } = auth()

    if (!userId) {
        throw new Error("User not Authenticated!")
    }

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

    const validatedFeilds = Profile.safeParse({ ...filterFields, cover })

    if (!validatedFeilds.success) {
        console.log(validatedFeilds.error.flatten().fieldErrors)
        return "err"
    }

    try {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: validatedFeilds.data
        })
    } catch (error) {
        console.log(error)
    }
}