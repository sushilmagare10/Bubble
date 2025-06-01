"use client"

import { FollowRequest, User } from '@prisma/client'
import Image from 'next/image'
import React, { useOptimistic, useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '../ui/button';
import { acceptFollowRequest } from '@/lib/actions/acceptFollowRequest';
import { declineFollowRequest } from '@/lib/actions/declineFollowRequest';

type RequestWithUser = FollowRequest & { sender: User }

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
    const [requestState, setRequestState] = useState(requests)

    const accept = async (requestId: number, userId: string) => {
        removeOptimisticRequest(requestId)
        try {
            await acceptFollowRequest(userId)
            setRequestState(prev => prev.filter((req) => req.id !== requestId))
        } catch (error) {
            console.log(error)
        }
    }

    const decline = async (requestId: number, userId: string) => {
        removeOptimisticRequest(requestId)
        try {
            await declineFollowRequest(userId)
            setRequestState(prev => prev.filter((req) => req.id !== requestId))
        } catch (error) {
            console.log(error)
        }
    }

    const [optimisticRequest, removeOptimisticRequest] = useOptimistic(
        requestState,
        (state, value: number) => state.filter((req) => req.id !== value)
    )

    return (
        <div className="space-y-3 border-border/70 bg-card/50 rounded-xl">
            {optimisticRequest.map(request => (
                <div key={request.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/30 transition-colors">
                    <div className="flex items-center gap-3">
                        <Image
                            src={request.sender.avatar || "/avatar.jpg"}
                            alt={request.sender.username}
                            width={40}
                            height={40}
                            className="rounded-full object-cover border border-border/50"
                        />
                        <div>
                            <p className="text-sm font-medium">
                                {request.sender.name && request.sender.lastname ? 
                                    `${request.sender.name} ${request.sender.lastname}` : 
                                    request.sender.username
                                }
                            </p>
                            <p className="text-xs text-muted-foreground">@{request.sender.username}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <form action={() => accept(request.id, request.sender.id)}>
                            <Button size="sm" className="h-8 w-8 p-0">
                                <Check className="w-4 h-4" />
                            </Button>
                        </form>
                        <form action={() => decline(request.id, request.sender.id)}>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-border/50">
                                <X className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FriendRequestList
