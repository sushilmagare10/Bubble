import prisma from '@/lib/client'
import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

const UserMediaCard = async ({ user }: { user?: User }) => {

    const postWithMedia = await prisma.post.findMany({
        where: {
            userId: user?.id,
            img: {
                not: null,
            },
        },
        take: 8,
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className='flex flex-col justify-center  p-4 gap-4 bg-card shadow-xl border'>
            <div className='flex justify-between items-center w-full'>
                <span className='text-sm text-gray-400'>User Media</span>
                <span className=' text-primary text-sm'>See All</span>
            </div>
            <div className=' flex justify-between gap-4 flex-wrap'>
                {postWithMedia.length ? postWithMedia.map(post => (

                    <div className=' relative w-1/5 h-24' key={post.id}>
                        <Image
                            src={post.img!}
                            alt='pic'
                            fill
                            className=' rounded-md object-cover'
                        />
                    </div>
                ))
                    : "No Media Found!"}
            </div>
        </div>

    )
}

export default UserMediaCard