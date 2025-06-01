"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "../client"

export const searchUsers = async (query: string) => {
  const { userId: currentUserId } = auth()

  if (!currentUserId) {
    throw new Error("User not authenticated")
  }

  try {
    // Get blocked user IDs (both ways)
    const blockedUsers = await prisma.block.findMany({
      where: {
        OR: [
          { blockerId: currentUserId },
          { blockedId: currentUserId }
        ]
      },
      select: {
        blockerId: true,
        blockedId: true
      }
    })

    const blockedUserIds = new Set([
      ...blockedUsers.map(b => b.blockerId),
      ...blockedUsers.map(b => b.blockedId)
    ])

    // Remove current user from blocked list
    blockedUserIds.delete(currentUserId)

    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              { username: { contains: query, mode: 'insensitive' } },
              { name: { contains: query, mode: 'insensitive' } },
              { lastname: { contains: query, mode: 'insensitive' } }
            ]
          },
          {
            id: {
              notIn: [currentUserId, ...Array.from(blockedUserIds)]
            }
          }
        ]
      },
      select: {
        id: true,
        username: true,
        name: true,
        lastname: true,
        avatar: true,
        followers: {
          where: {
            followerId: currentUserId
          }
        },
        followRequestReceived: {
          where: {
            senderId: currentUserId
          }
        }
      },
      take: 10
    })

    return users
      .filter(user => user.id !== currentUserId)
      .map(user => ({
        ...user,
        isFollowing: user.followers.length > 0,
        hasPendingRequest: user.followRequestReceived.length > 0
      }))
  } catch (error) {
    console.log(error)
    throw new Error("Something went wrong")
  }
}

export const getAllUsers = async () => {
  const { userId: currentUserId } = auth()

  if (!currentUserId) {
    throw new Error("User not authenticated")
  }

  try {
    const blockedUsers = await prisma.block.findMany({
      where: {
        OR: [
          { blockerId: currentUserId },
          { blockedId: currentUserId }
        ]
      },
      select: {
        blockerId: true,
        blockedId: true
      }
    })

    const blockedUserIds = new Set([
      ...blockedUsers.map(b => b.blockerId),
      ...blockedUsers.map(b => b.blockedId)
    ])

    blockedUserIds.delete(currentUserId)

    const users = await prisma.user.findMany({
      where: {
        id: {
          notIn: [currentUserId, ...Array.from(blockedUserIds)]
        }
      },
      select: {
        id: true,
        username: true,
        name: true,
        lastname: true,
        avatar: true,
        followers: {
          where: {
            followerId: currentUserId
          }
        },
        followRequestReceived: {
          where: {
            senderId: currentUserId
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    })

    return users
      .filter(user => user.id !== currentUserId)
      .map(user => ({
        ...user,
        isFollowing: user.followers.length > 0,
        hasPendingRequest: user.followRequestReceived.length > 0
      }))
  } catch (error) {
    console.log(error)
    throw new Error("Something went wrong")
  }
}
