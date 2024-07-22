import React from 'react'
import Post from './Post'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/client'
import NoPosts from './NoPosts'

const Feed = async ({ username }: { username?: string }) => {

    const { userId } = auth()

    let posts: any[] = [];

    if (userId) {
        posts = await prisma.post.findMany({
            where: {
                user: {
                    username: username
                }
            },
            include: {
                user: true,
                likes: {
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    if (!username && userId) {
        const following = await prisma.follower.findMany({
            where: {
                followerId: userId,
            },
            select: {
                followingId: true,
            },
        });

        const followingIds = following.map((f) => f.followingId);
        const ids = [userId, ...followingIds]

        posts = await prisma.post.findMany({
            where: {
                userId: {
                    in: ids,
                },
            },
            include: {
                user: true,
                likes: {
                    select: {
                        userId: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    return (
        <div className=' bg-background mb-6 rounded-lg flex flex-col gap-11'>
            {posts.length ? (posts.map(post => (
                <Post key={post.id} post={post} />
            ))) : (
                <NoPosts />
            )}
        </div>
    )
}

export default Feed