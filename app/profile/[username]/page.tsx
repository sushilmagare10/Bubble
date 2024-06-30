import LeftSidebar from '@/components/LeftSidebar/LeftSidebar'
import React from 'react'

const ProfilePage = ({ params }: { params: { username: string } }) => {
    return (
        <div className=' flex'>
            <LeftSidebar />
        </div>
    )
}

export default ProfilePage