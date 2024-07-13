import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/client'
import Link from 'next/link'
import { Card, CardContent, CardTitle } from '../ui/card'

const ProfileCard = async () => {

    const { userId } = auth()
    if (!userId) return null

    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
        include: {
            _count: {
                select: {
                    followers: true
                }
            }
        }
    })

    if (!user) return null

    return (
        <Card className='flex flex-col justify-start items-center p-3 dark:border-white/40 rounded-lg h-64'>
            <CardContent className=' relative  h-1/2 w-full '>
                <Image
                    src={user.cover || "/banner.jpg"}
                    alt="Banner"
                    className='rounded-md'
                    fill />

                {/* ProfilePic */}

                <Image
                    src={user?.avatar || '/avatar.jpg'}
                    alt='profilePic'
                    className='rounded-full object-cover w-16 h-16 absolute left-0 right-0 m-auto -bottom-7 ring-1 ring-white z-10'
                    width={64}
                    height={64}
                    quality={100}
                />

            </CardContent>
            {/* user info */}
            <CardContent className=' w-full flex p-0 flex-col justify-between items-center'>
                <CardTitle className='text-lg font-semibold mt-9'>
                    {(user.name && user.lastname) ? user.name + " " + user.lastname : user.username}
                </CardTitle>
                <div>{user._count.followers}</div>
                <Link href={`/profile/${user.username}`} className=' w-full'>
                    <Button className='w-full mt-4 bg-primary text-white font-semibold tracking-wide'>
                        Profile
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default ProfileCard