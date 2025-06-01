import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import FriendRequestList from './FriendRequestList';
import { Card, CardContent, CardHeader } from '../ui/card';
import { UserPlus } from 'lucide-react';

const FriendRequest = async () => {
    const { userId } = auth()
    if (!userId) return null;

    const requests = await prisma.followRequest.findMany({
        where: { receiverId: userId },
        include: { sender: true }
    })

    if (requests.length === 0) return null

    return (
        <Card className="border-border/70 bg-card/50 rounded-xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-medium text-sm">Friend Requests</h3>
                </div>
                <button className="text-xs text-primary hover:text-primary/80 font-medium">
                    See All
                </button>
            </CardHeader>
            <CardContent className="space-y-3">
                <FriendRequestList requests={requests} />
            </CardContent>
        </Card>
    )
}

export default FriendRequest