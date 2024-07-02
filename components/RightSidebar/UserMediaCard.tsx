import Image from 'next/image'
import React from 'react'

const UserMediaCard = ({ userId }: { userId?: string }) => {
    return (
        <div className='flex flex-col justify-center  p-4 gap-4 bg-card shadow-xl border'>
            <div className='flex justify-between items-center w-full'>
                <span className='text-sm text-gray-400'>User Media</span>
                <span className=' text-primary text-sm'>See All</span>
            </div>
            <div className=' flex justify-between gap-4 flex-wrap'>
                <div className=' relative w-1/5 h-24'>
                    <Image
                        src='/profile2.jpg'
                        alt='pic'
                        fill
                        className=' rounded-md object-cover'
                    />
                </div>
                <div className=' relative w-1/5 h-24'>

                    <Image
                        src='/profile3.png'
                        alt='pic'
                        fill
                        className=' rounded-md object-cover'
                    />
                </div>
                <div className=' relative w-1/5 h-24'>

                    <Image
                        src='/coding.jpg'
                        alt='pic'
                        fill
                        className=' rounded-md object-cover'
                    />
                </div>
                <div className=' relative w-1/5 h-24'>

                    <Image
                        src='/banner.jpg'
                        alt='pic'
                        fill
                        className=' rounded-md object-cover'
                    />
                </div>
                <div className=' relative w-1/5 h-24'>

                    <Image
                        src='/profile2.jpg'
                        alt='pic'
                        fill
                        className=' rounded-md object-cover'
                    />
                </div>
                <div className=' relative w-1/5 h-24'>

                    <Image
                        src='/profile3.png'
                        alt='pic'
                        fill
                        className=' rounded-md object-cover'
                    />
                </div>
                <div className=' relative w-1/5 h-24'>

                    <Image
                        src='/coding.jpg'
                        alt='pic'
                        fill
                        className=' rounded-md object-cover'
                    />
                </div>
                <div className=' relative w-1/5 h-24'>

                    <Image
                        src='/banner.jpg'
                        alt='pic'
                        fill
                        className=' rounded-md object-cover'
                    />
                </div>
            </div>
        </div>

    )
}

export default UserMediaCard