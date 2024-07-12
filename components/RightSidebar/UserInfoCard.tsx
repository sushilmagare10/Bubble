import Link from 'next/link'
import React from 'react'
import { IoLocation } from "react-icons/io5";
import { MdWork, MdCalendarMonth } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { Button } from '../ui/button';
import { User } from '@prisma/client';
import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import UserInfoCardInteraction from './UserInfoCardInteraction';
import UpdateUser from './UpdateUser';


const UserInfoCard = async ({ user }: { user: User }) => {

    const createdAtDate = new Date(user.createdAt)
    const formattedDate = createdAtDate.toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    let isUserBlocked = false;
    let isFollowing = false;
    let isFollowingSent = false;

    const { userId: currentUserId } = auth();

    if (currentUserId) {
        const blockRes = await prisma.block.findFirst({
            where: {
                blockerId: currentUserId,
                blockedId: user.id,
            },
        });

        blockRes ? (isUserBlocked = true) : (isUserBlocked = false);
        const followRes = await prisma.follower.findFirst({
            where: {
                followerId: currentUserId,
                followingId: user.id,
            },
        });

        followRes ? (isFollowing = true) : (isFollowing = false);
        const followReqRes = await prisma.followRequest.findFirst({
            where: {
                senderId: currentUserId,
                receiverId: user.id,
            },
        });

        followReqRes ? (isFollowingSent = true) : (isFollowingSent = false);

    }

    return (
        <div className=' flex flex-col justify-between items-center p-4 gap-5 bg-card border rounded-lg'>
            <div className=' flex justify-between w-full mt-2 self-start'>
                <span className=' text-gray-400 font-semibold text-xs'>User Information</span>
                {currentUserId === user.id ? (
                    <UpdateUser user={user} />
                ) : (
                    <Link href="/" className="text-blue-500 text-xs">
                        See all
                    </Link>
                )}
            </div>
            <div className=' flex flex-col w-full gap-4'>
                <div className=' flex justify-start items-center gap-2'>
                    <p className=' text-xl text-gray-800 font-bold'>
                        {" "}  {(user.name && user.lastname) ? user.name + " " + user.lastname : user.username}
                    </p>
                    <p className=' text-sm font-medium text-gray-400'>@{user.username}</p>
                </div>
                {user.description && <p>{user.description}</p>}
                <div className='flex flex-col w-full justify-center text-sm items-start gap-2'>
                    {user.city && (
                        <div className=' flex justify-start text-gray-400 items-center gap-2'>
                            <IoLocation />
                            Living in
                            <span className='text-gray-800 font-bold'>{user.city}</span>
                        </div>
                    )}
                    {user.school && (
                        <div className=' flex justify-start text-gray-400 items-center gap-2'>
                            <FaGraduationCap />
                            Went to
                            <span className='text-gray-800 font-bold'>{user.school}</span>
                        </div>
                    )}
                    {user.work && (
                        <div className=' flex justify-start text-gray-400 items-center gap-2'>
                            <MdWork />
                            Works at
                            <span className='text-gray-800 font-bold'>{user.work}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex w-full justify-between items-center text-sm'>
                <Link href='/' className=' flex justify-between items-center gap-2 font-medium text-primary'>
                    <FaLink className=' fill-gray-400' />
                    {user.website}
                </Link>
                <div className=' flex justify-between items-center gap-2 font-medium text-gray-600'>
                    <MdCalendarMonth className='fill-gray-400' />
                    Joined {formattedDate}
                </div>
            </div>

            {currentUserId && currentUserId !== user.id && (
                <UserInfoCardInteraction
                    userId={user.id}
                    isUserBlocked={isUserBlocked}
                    isFollowing={isFollowing}
                    isFollowingSent={isFollowingSent}
                />
            )}
        </div>
    )
}

export default UserInfoCard