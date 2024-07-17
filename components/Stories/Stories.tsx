import Image from 'next/image'
import React from 'react'
import StoryItem from './StoryItem'
import { Card } from '../ui/card'
import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'

const Stories = async () => {

    const { userId: currentUserId } = auth();

    if (!currentUserId) return null;

    const stories = await prisma.story.findMany({
        where: {
            expiresAt: {
                gt: new Date(),
            },
            OR: [
                {
                    user: {
                        followers: {
                            some: {
                                followerId: currentUserId,
                            },
                        },
                    },
                },
                {
                    userId: currentUserId,
                },
            ],
        },
        include: {
            user: true,
        },
    });

    return (
        <Card className='p-4 bg-card rounded-lg border dark:border-white/40 overflow-scroll text-xs scrollbar-hide'>
            <div className='flex gap-8 w-max'>
                <StoryItem stories={stories} userId={currentUserId} />
            </div>
        </Card>
    )
}

export default Stories