import React from 'react'
import ProfileCard from './ProfileCard'
import LeftSidebarNav from './LeftSidebarNav'
import Ad from '../Ad'

const LeftSidebar = ({ type }: { type: "home" | "profile" }) => {
    return (
        <div className='flex flex-col gap-6'>
            {type === "home" && <ProfileCard />}
            <LeftSidebarNav />
            <Ad size='sm' />
        </div>
    )
}

export default LeftSidebar