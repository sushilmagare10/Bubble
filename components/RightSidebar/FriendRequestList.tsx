"use client"

import { FollowRequest, User } from '@prisma/client'
import Image from 'next/image'
import React, { useOptimistic, useState } from 'react'
import { FaCheck } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { Button } from '../ui/button';
import { acceptFollowRequest } from '@/lib/actions/acceptFollowRequest';
import { declineFollowRequest } from '@/lib/actions/declineFollowRequest';

type RequestWithUser = FollowRequest & {
    sender: User
}


const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {

    const [requestState, setRequestState] = useState(requests)

    const accept = async (requestId: number, userId: string) => {
        removeOptimisticRequest(requestId)

        try {
            await acceptFollowRequest(userId)
            setRequestState(prev => prev.filter((req) => req.id !== requestId))
        } catch (error) {
            console.log(error)
            throw new Error("Something went wrong!")
        }
    }

    const decline = async (requestId: number, userId: string) => {
        removeOptimisticRequest(requestId)

        try {
            await declineFollowRequest(userId)
            setRequestState(prev => prev.filter((req) => req.id !== requestId))
        } catch (error) {
            console.log(error)
            throw new Error("Something went wrong!")
        }
    }

    const [optimisticRequest, removeOptimisticRequest] = useOptimistic(
        requestState,
        (state, value: number) => state.filter((req) => req.id !== value)
    )

    return (
        <>
            {optimisticRequest.map(request => (
                <div
                    key={request.id}
                    className=' w-full h-full flex justify-between items-center text-lg gap-2 font-medium '>
                    <div className=' flex justify-between items-center gap-2'>
                        <Image
                            src={request.sender.avatar || "/avatar.jpg"}
                            alt={request.sender.username}
                            width={48}
                            height={48}
                            className=' object-cover w-12 h-12 ring-1 ring-white rounded-full'
                        />
                        <p>
                            {request.sender.name && request.sender.lastname ? request.sender.name + " " + request.sender.lastname : request.sender.username}
                        </p>
                    </div>
                    <div className=' flex justify-between items-center gap-4'>
                        <form action={() => accept(request.id, request.sender.id)} className=' h-full w-full'>
                            <Button className='flex justify-center items-center p-0 w-6 h-6 rounded-full cursor-pointer'>
                                <FaCheck className=' text-white text-sm' />
                            </Button>
                        </form>
                        <form action={() => decline(request.id, request.sender.id)}>
                            <Button variant="outline" className='flex justify-center items-center p-0 w-6 h-6 rounded-full border-black/40 border cursor-pointer'>
                                <IoIosClose className='  text-xl' />
                            </Button>
                        </form>
                    </div>
                </div>
            ))}
        </>
    )
}

export default FriendRequestList