import React, { Suspense } from 'react'
import FriendRequest from './FriendRequest'
import Ad from '../Ad'
import UserInfoCard from './UserInfoCard'
import UserMediaCard from './UserMediaCard'
import { User } from '@prisma/client'

const RightSidebar = ({ user }: { user?: User }) => {
    return (
        <div className=' flex flex-col gap-6'>
            {user ? (
                <>
                    <Suspense fallback='loading...'>
                        <UserInfoCard user={user} />
                    </Suspense>
                    <Suspense fallback='loading...'>
                        <UserMediaCard user={user} />
                    </Suspense>
                </>
            ) : null}
            <FriendRequest />
            <Ad size='md' />
        </div>
    )
}

export default RightSidebar