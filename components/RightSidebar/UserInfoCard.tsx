import Link from 'next/link'
import React from 'react'
import { MapPin, GraduationCap, Briefcase, Calendar, ExternalLink, Settings } from 'lucide-react'
import { Button } from '../ui/button';
import { User } from '@prisma/client';
import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import UserInfoCardInteraction from './UserInfoCardInteraction';
import UpdateUser from './UpdateUser';
import { Card, CardContent, CardHeader } from '../ui/card';

const UserInfoCard = async ({ user }: { user: User }) => {
    const createdAtDate = new Date(user.createdAt)
    const formattedDate = createdAtDate.toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    let isUserBlocked = false;
    let isFollowing = false;
    let isFollowingSent = false;

    const { userId: currentUserId } = auth();

    if (currentUserId) {
        const [blockRes, followRes, followReqRes] = await Promise.all([
            prisma.block.findFirst({
                where: { blockerId: currentUserId, blockedId: user.id }
            }),
            prisma.follower.findFirst({
                where: { followerId: currentUserId, followingId: user.id }
            }),
            prisma.followRequest.findFirst({
                where: { senderId: currentUserId, receiverId: user.id }
            })
        ]);

        isUserBlocked = !!blockRes;
        isFollowing = !!followRes;
        isFollowingSent = !!followReqRes;
    }

    return (
        <Card className="border-border/70 bg-card/50 rounded-xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-medium text-sm">About</h3>
                </div>
                {currentUserId === user.id ? (
                    <UpdateUser user={user} />
                ) : (
                    <Link href="/" className="text-xs text-primary hover:text-primary/80 font-medium">
                        See all
                    </Link>
                )}
            </CardHeader>

            <CardContent className="space-y-6">
                {/* User Identity */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold">
                            {(user.name && user.lastname) ? 
                                `${user.name} ${user.lastname}` : 
                                user.username
                            }
                        </h2>
                        <span className="text-sm text-muted-foreground">@{user.username}</span>
                    </div>
                    {user.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {user.description}
                        </p>
                    )}
                </div>

                {/* User Details */}
                <div className="space-y-3">
                    {user.city && (
                        <div className="flex items-center gap-3 text-sm">
                            <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="text-muted-foreground">Lives in</span>
                            <span className="font-medium">{user.city}</span>
                        </div>
                    )}
                    {user.school && (
                        <div className="flex items-center gap-3 text-sm">
                            <GraduationCap className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="text-muted-foreground">Studied at</span>
                            <span className="font-medium">{user.school}</span>
                        </div>
                    )}
                    {user.work && (
                        <div className="flex items-center gap-3 text-sm">
                            <Briefcase className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="text-muted-foreground">Works at</span>
                            <span className="font-medium">{user.work}</span>
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    {user.website && (
                        <Link 
                            href={`https://${user.website}`} 
                            target="_blank"
                            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span className="truncate max-w-[120px]">{user.website}</span>
                        </Link>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>Joined {formattedDate}</span>
                    </div>
                </div>

                {/* User Actions */}
                {currentUserId && currentUserId !== user.id && (
                    <div className="pt-4 border-t border-border/50">
                        <UserInfoCardInteraction
                            userId={user.id}
                            isUserBlocked={isUserBlocked}
                            isFollowing={isFollowing}
                            isFollowingSent={isFollowingSent}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default UserInfoCard