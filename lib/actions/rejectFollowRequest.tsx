
"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import prisma from "../client"

export const rejectFollowRequest = async (senderId: string) => {
  const { userId } = auth()

  if (!userId) {
    throw new Error("User not authenticated")
  }

  try {
    // Check if the follow request exists
    const existingRequest = await prisma.followRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId: senderId,
          receiverId: userId,
        },
      },
    })

    if (!existingRequest) {
      throw new Error("Follow request not found")
    }

    // Delete the follow request
    await prisma.followRequest.delete({
      where: {
        senderId_receiverId: {
          senderId: senderId,
          receiverId: userId,
        },
      },
    })

    // Revalidate relevant paths
    revalidatePath("/friends")
    revalidatePath("/notifications")
    
    return { success: true, message: "Follow request rejected successfully" }
  } catch (error) {
    console.error("Error rejecting follow request:", error)
    throw new Error("Failed to reject follow request")
  }
}