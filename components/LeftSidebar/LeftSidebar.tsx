import React from 'react'
import ProfileCard from './ProfileCard'
import LeftSidebarNav from './LeftSidebarNav'
import Ad from '../Ad'

const LeftSidebar = () => {
    return (
        <div className='flex flex-col gap-6'>
            <ProfileCard />
            <LeftSidebarNav />
            <Ad />
        </div>
    )
}

export default LeftSidebar