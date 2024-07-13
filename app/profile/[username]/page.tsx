import Feed from '@/components/Feed/Feed'
import LeftSidebar from '@/components/LeftSidebar/LeftSidebar'
import RightSidebar from '@/components/RightSidebar/RightSidebar'
import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

const ProfilePage = async ({ params }: { params: { username: string } }) => {

    const username = params.username
    const user = await prisma.user.findFirst({
        where: {
            username,
        },
        include: {
            _count: {
                select: {
                    followers: true,
                    followings: true,
                    posts: true
                }
            }
        }
    })

    if (!user) return notFound()

    const { userId: currentUserId } = auth();
    let isBlocked;

    if (currentUserId) {
        const res = await prisma.block.findFirst({
            where: {
                blockerId: user.id,
                blockedId: currentUserId,
            },
        });

        if (res) isBlocked = true;
    } else {
        isBlocked = false;
    }

    if (isBlocked) return notFound();



    return (
        <main className="flex gap-6 pt-6 ">
            <aside className="hidden md:block xl:w-[20%] h-full sticky top-4">
                <LeftSidebar type="profile" />
            </aside>
            <section className="w-full lg:w-[70%] xl:w-[50%]">
                <div className="flex flex-col gap-8">
                    <div className=' flex flex-col justify-center items-center'>
                        <div className=' w-full h-64 relative'>
                            <Image
                                src={user.cover || "/banner.jpg"}
                                alt='banner'
                                fill
                                className=' rounded-lg object-cover '
                            />
                            <Image
                                src={user?.avatar || '/avatar.jpg'}
                                alt='profile'
                                quality={100}
                                width={128}
                                height={128}
                                className=' rounded-full w-32 h-32 ring-4 absolute m-auto left-0 right-0 -bottom-16 ring-white object-cover'
                            />
                        </div>
                        <h2 className=' mt-20 text-2xl text-center font-bold '>
                            {(user.name && user.lastname) ? user.name + " " + user.lastname : user.username}
                        </h2>
                        <div className='mt-10 flex justify-between items-center gap-16 '>
                            <div className=' font-semibold flex flex-col justify-center items-center gap-1'>
                                <span className='font-semibold text-lg'>{user._count.posts}</span>
                                <span className='font-medium'>Posts</span>
                            </div>
                            <div className=' font-semibold flex flex-col justify-center items-center gap-1'>
                                <span className='font-semibold text-lg'>{user._count.followers} k</span>
                                <span className='font-medium'>Followers</span>
                            </div>
                            <div className=' font-semibold flex flex-col justify-center items-center gap-1'>
                                <span className='font-semibold text-lg'>{user._count.followings}</span>
                                <span className='font-medium'>Following</span>
                            </div>
                        </div>
                    </div>
                    <Feed username={user.username} />
                </div>
            </section>
            <aside className="hidden lg:block w-[30%] h-[calc(100vh-2rem)] sticky top-4 overflow-y-auto scrollbar-hide">
                <RightSidebar user={user} />
            </aside>
        </main>
    )
}

export default ProfilePage
