import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/client'
import Link from 'next/link'
import { Card, CardContent } from '../ui/card'
import { Users } from 'lucide-react'

const ProfileCard = async () => {
    const { userId } = auth()
    if (!userId) return null

    const user = await prisma.user.findFirst({
        where: { id: userId },
        include: {
            _count: { select: { followers: true } }
        }
    })

    if (!user) return null

    return (
        <Card className="overflow-hidden border-border/70 bg-card/50 rounded-xl shadow-sm">
            <CardContent className="p-0">
                {/* Cover Image */}
                <div className="relative h-20 w-full">
                    <Image
                        src={user.cover || "/banner.jpg"}
                        alt="Cover"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Profile Section */}
                <div className="relative px-4 pb-4">
                    {/* Profile Picture */}
                    <div className="flex justify-center -mt-8 mb-4">
                        <div className="relative">
                            <Image
                                src={user?.avatar || '/avatar.jpg'}
                                alt='Profile'
                                width={64}
                                height={64}
                                className='rounded-full object-cover border-4 border-background shadow-lg'
                            />
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="text-center space-y-3">
                        <div>
                            <h3 className="font-semibold text-foreground">
                                {(user.name && user.lastname) ? 
                                    `${user.name} ${user.lastname}` : 
                                    user.username
                                }
                            </h3>
                            <p className="text-sm text-muted-foreground">@{user.username}</p>
                        </div>

                        {/* Followers Count */}
                        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{user._count.followers} followers</span>
                        </div>

                        {/* Profile Button */}
                        <Link href={`/profile/${user.username}`} className="block">
                            <Button className="w-full" size="sm">
                                View Profile
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfileCard