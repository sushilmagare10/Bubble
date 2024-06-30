import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const ProfileCard = () => {
    return (
        <div className='flex flex-col justify-start items-center p-3 bg-card shadow-xl rounded-md h-64'>
            <div className=' relative  h-1/2 w-full '>
                <Image
                    src="/banner.jpg"
                    alt="Banner"
                    className='rounded-md'
                    fill />

                {/* ProfilePic */}

                <Image
                    src="/avatar.jpg"
                    alt='profilePic'
                    className='rounded-full object-cover w-14 h-14 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10'
                    width={56}
                    height={56}
                />

            </div>
            {/* user info */}
            <div className=' w-full flex flex-col justify-between items-center'>
                <div className='text-lg font-semibold text-gray-700 mt-9'> Sushil Magare</div>
                <div></div>
                <Button className=' bg-orange-400 hover:bg-orange-600 w-full mt-4 font-semibold tracking-wide'>
                    Profile
                </Button>
            </div>
        </div>
    )
}

export default ProfileCard