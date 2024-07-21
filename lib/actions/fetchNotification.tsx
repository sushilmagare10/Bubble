// app/actions/fetchNotifications.ts
"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "../client"

export const fetchNotifications = async () => {
    const { userId } = auth()

    if (!userId) {
        throw new Error("User not authenticated")
    }

    try {
        const notifications = await prisma.notification.findMany({
            where: {
                userId,
                isRead: false
            },
            orderBy: {
                createdAt: 'desc'
            },
        })

        return notifications
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch notifications")
    }
}

export const markNotificationAsRead = async (notificationId: string) => {
    try {
        await prisma.notification.update({
            where: { id: notificationId },
            data: {
                isRead: true,

            },

        })

        await prisma.notification.delete({
            where: {
                id: notificationId,
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error("Failed to mark notification as read")
    }
}