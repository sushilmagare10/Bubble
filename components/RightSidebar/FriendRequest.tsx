import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

import FriendRequestList from './FriendRequestList';
import { Card, CardContent, CardDescription } from '../ui/card';


const FriendRequest = async () => {

    const { userId } = auth()
    if (!userId) return null;

    const requests = await prisma.followRequest.findMany({
        where: {
            receiverId: userId
        },
        include: {
            sender: true
        }
    })

    if (requests.length === 0) return null

    return (
        <Card className=' flex flex-col justify-between w-full items-center bg-card border gap-4 rounded-lg shadow-xl p-4'>
            <CardContent className=' flex w-full justify-between items-center text-sm font-medium p-0'>
                <CardDescription className='text-gray-500'>Friend Requests</CardDescription>
                <span className=' text-primary '>See All</span>
            </CardContent>
            <FriendRequestList requests={requests} />
        </Card>
    )
}

export default FriendRequest