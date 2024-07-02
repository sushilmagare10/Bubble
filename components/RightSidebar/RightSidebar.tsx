import React from 'react'
import FriendRequest from './FriendRequest'
import Ad from '../Ad'
import UserInfoCard from './UserInfoCard'
import UserMediaCard from './UserMediaCard'

const RightSidebar = ({ userId }: { userId?: string }) => {
    return (
        <div className=' flex flex-col gap-6'>
            {userId ? (
                <>
                    <UserInfoCard userId={userId} />
                    <UserMediaCard userId={userId} />
                </>
            ) : null}
            <FriendRequest />
            <Ad size='md' />
        </div>
    )
}

export default RightSidebar