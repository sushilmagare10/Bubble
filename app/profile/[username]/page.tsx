import Feed from '@/components/Feed/Feed'
import LeftSidebar from '@/components/LeftSidebar/LeftSidebar'
import RightSidebar from '@/components/RightSidebar/RightSidebar'
import React from 'react'

const ProfilePage = ({ params }: { params: { username: string } }) => {
    return (
        <main className="flex gap-6 pt-6 ">
            <aside className="hidden md:block xl:w-[20%] h-full sticky top-4">
                <LeftSidebar type="profile" />
            </aside>
            <section className="w-full lg:w-[70%] xl:w-[50%]">
                <div className="flex flex-col gap-8">
                    <Feed />
                </div>
            </section>
            <aside className="hidden lg:block w-[30%] h-full sticky top-4">
                <RightSidebar userId='testId' />
            </aside>
        </main>
    )
}

export default ProfilePage