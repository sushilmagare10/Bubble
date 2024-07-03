import Feed from '@/components/Feed/Feed'
import LeftSidebar from '@/components/LeftSidebar/LeftSidebar'
import RightSidebar from '@/components/RightSidebar/RightSidebar'
import Image from 'next/image'
import React from 'react'

const ProfilePage = ({ params }: { params: { username: string } }) => {
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
                                src='/banner.jpg'
                                alt='banner'
                                fill
                                className=' rounded-lg object-cover '
                            />
                            <Image
                                src='/profile3.png'
                                alt='profile'
                                quality={100}
                                width={128}
                                height={128}
                                className=' rounded-full w-32 h-32 ring-4 absolute m-auto left-0 right-0 -bottom-16 ring-white object-cover'
                            />
                        </div>
                        <h1 className=' mt-20 text-2xl text-center font-bold text-gray-800'>John Doe</h1>
                        <div className='mt-10 flex justify-between items-center gap-16 '>
                            <div className=' font-semibold flex flex-col justify-center items-center gap-1'>
                                <span className='font-semibold text-lg'>150</span>
                                <span className='font-medium'>Posts</span>
                            </div>
                            <div className=' font-semibold flex flex-col justify-center items-center gap-1'>
                                <span className='font-semibold text-lg'>1.8k</span>
                                <span className='font-medium'>Followers</span>
                            </div>
                            <div className=' font-semibold flex flex-col justify-center items-center gap-1'>
                                <span className='font-semibold text-lg'>5.95k</span>
                                <span className='font-medium'>Following</span>
                            </div>
                        </div>
                    </div>
                    <Feed />
                </div>
            </section>
            <aside className="hidden lg:block w-[30%] h-[calc(100vh-2rem)] sticky top-4 overflow-y-auto scrollbar-hide">
                <RightSidebar userId='testId' />
            </aside>
        </main>
    )
}

export default ProfilePage
