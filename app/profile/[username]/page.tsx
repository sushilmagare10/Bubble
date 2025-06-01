// app/profile/[username]/page.tsx

import Feed from '@/components/Feed/Feed'
import LeftSidebar from '@/components/LeftSidebar/LeftSidebar'
import RightSidebar from '@/components/RightSidebar/RightSidebar'
import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const username = params.username


  // Debug: Check what's in the database
  const allUsers = await prisma.user.findMany({
    select: { id: true, username: true, name: true }
  })

  const user = await prisma.user.findFirst({
    where: { 
      username: {
        equals: username,
        mode: 'insensitive'
      }
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  })


  if (!user) {
    return notFound()
  }

  const { userId: currentUserId } = auth()

  let isBlocked = false

  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    })
    if (res) isBlocked = true
  }

  if (isBlocked) return notFound()

  return (
    <main className="flex gap-6 pt-6 min-h-screen">
      <aside className="hidden md:block xl:w-[20%] h-full sticky top-4">
        <LeftSidebar type="profile" />
      </aside>

      <section className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center space-y-6">
            {/* Cover & Avatar */}
            <div className="w-full h-60 relative rounded-xl bg-muted">
              <Image
                src={user.cover || '/banner.jpg'}
                alt="Profile cover"
                fill
                className="object-cover"
              />
              <div className="absolute  -bottom-12 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <Image
                    src={user.avatar || '/avatar.jpg'}
                    alt="Profile picture"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full border-4 border-background object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center pt-12 space-y-4">
              <h1 className="text-2xl font-semibold text-foreground">
                {user.name && user.lastname
                  ? `${user.name} ${user.lastname}`
                  : user.username}
              </h1>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 pt-2">
                <div className="text-center">
                  <div className="text-xl font-semibold text-foreground">
                    {user._count.posts}
                  </div>
                  <div className="text-sm text-muted-foreground">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-foreground">
                    {user._count.followings}k
                  </div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-foreground">
                    {user._count.followers}k
                  </div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feed */}
          <Feed username={user.username} />
        </div>
      </section>

      <aside className="hidden lg:block w-[30%] h-[calc(100vh-2rem)] sticky top-4 overflow-y-auto scrollbar-hide">
        <RightSidebar user={user} />
      </aside>
    </main>
  )
}

export default ProfilePage