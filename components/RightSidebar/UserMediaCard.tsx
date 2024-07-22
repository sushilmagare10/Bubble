import prisma from '@/lib/client';
import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { Card, CardContent } from '../ui/card';

const UserMediaCard = async ({ user }: { user: User }) => {
    const postsWithMedia = await prisma.post.findMany({
        where: {
            userId: user.id,
            img: {
                not: null,
            },
        },
        take: 8,
        orderBy: {
            createdAt: "desc",
        },
    });
    return (
        <Card className='flex flex-col justify-center  p-4 gap-4 dark:border-white/40'>
            <CardContent className='flex justify-between p-0 items-center w-full'>
                <span className='text-sm text-gray-400'>User Media</span>
                <span className=' text-primary text-sm'>See All</span>
            </CardContent>
            <CardContent className=' flex p-0 justify-between gap-4 flex-wrap'>
                {postsWithMedia.length
                    ? postsWithMedia.map((post) => (
                        <div className="relative w-1/5 h-24" key={post.id}>
                            <Image
                                src={post.img!}
                                alt=""
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>
                    ))
                    : (
                        <Card className='w-full border-none shadow-none flex flex-col justify-center items-center'>
                            <CardContent className='mt-2'>
                                No Media Found 😢
                            </CardContent>
                        </Card>
                    )}
            </CardContent>
        </Card>

    )
}

export default UserMediaCard