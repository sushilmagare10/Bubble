import React from 'react'
import FriendRequest from './FriendRequest'
import Ad from '../Ad'

const RightSidebar = () => {
    return (
        <div className=' flex flex-col gap-6'>
            <FriendRequest />
            <Ad />
        </div>
    )
}

export default RightSidebar