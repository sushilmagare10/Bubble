import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const ProfileCard = () => {
    return (
        <div className='flex flex-col justify-start items-center p-3 bg-card border shadow-xl rounded-md h-64'>
            <div className=' relative  h-1/2 w-full '>
                <Image
                    src="/banner.jpg"
                    alt="Banner"
                    className='rounded-md'
                    fill />

                {/* ProfilePic */}

                <Image
                    src="/profile3.png"
                    alt='profilePic'
                    className='rounded-full object-cover w-16 h-16 absolute left-0 right-0 m-auto -bottom-7 ring-1 ring-white z-10'
                    width={64}
                    height={64}
                    quality={100}
                />

            </div>
            {/* user info */}
            <div className=' w-full flex flex-col justify-between items-center'>
                <div className='text-lg font-semibold mt-9'> Sushil Magare</div>
                <div></div>
                <Button className='w-full mt-4 bg-primary text-white font-semibold tracking-wide'>
                    Profile
                </Button>
            </div>
        </div>
    )
}

export default ProfileCard