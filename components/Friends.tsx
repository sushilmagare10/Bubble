"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { UserMinus, UserPlus, Clock, Check, X, Users, UserCheck } from 'lucide-react'
import { switchFollow } from '@/lib/actions/switchFollow'
import { toast } from 'sonner'
import Link from 'next/link'
import { acceptFollowRequest } from '@/lib/actions/acceptFollowRequest'
import { rejectFollowRequest } from '@/lib/actions/rejectFollowRequest'

interface User {
    id: string
    username: string
    name: string | null
    lastname: string | null
    avatar: string | null
    isFollowing?: boolean
    hasPendingRequest?: boolean
}

interface FriendsProps {
    initialFriends?: User[]
    initialFollowRequests?: User[]
    showTabs?: boolean
    showRequestsOnly?: boolean
}

const Friends = ({ 
    initialFriends = [], 
    initialFollowRequests = [], 
    showRequestsOnly = false 
}: FriendsProps) => {
    const [friends, setFriends] = useState<User[]>(initialFriends)
    const [followRequests, setFollowRequests] = useState<User[]>(initialFollowRequests)
    const [loadingUsers, setLoadingUsers] = useState<Set<string>>(new Set())

    const handleUnfollow = async (userId: string) => {
        if (loadingUsers.has(userId)) return

        setLoadingUsers(prev => new Set(prev).add(userId))

        try {
            await switchFollow(userId)
            setFriends(prev => prev.filter(friend => friend.id !== userId))
            toast.success("User unfollowed successfully")
        } catch {
            toast.error("Failed to unfollow user")
        } finally {
            setLoadingUsers(prev => {
                const newSet = new Set(prev)
                newSet.delete(userId)
                return newSet
            })
        }
    }

    const handleAcceptRequest = async (userId: string) => {
        if (loadingUsers.has(userId)) return

        setLoadingUsers(prev => new Set(prev).add(userId))

        try {
            await acceptFollowRequest(userId)
            const acceptedUser = followRequests.find(user => user.id === userId)
            if (acceptedUser) {
                setFollowRequests(prev => prev.filter(user => user.id !== userId))
                setFriends(prev => [...prev, { ...acceptedUser, isFollowing: true }])
            }
            toast.success("Follow request accepted")
        } catch {
            toast.error("Failed to accept request")
        } finally {
            setLoadingUsers(prev => {
                const newSet = new Set(prev)
                newSet.delete(userId)
                return newSet
            })
        }
    }

    const handleRejectRequest = async (userId: string) => {
        if (loadingUsers.has(userId)) return

        setLoadingUsers(prev => new Set(prev).add(userId))

        try {
            await rejectFollowRequest(userId)
            setFollowRequests(prev => prev.filter(user => user.id !== userId))
            toast.success("Follow request rejected")
        } catch {
            toast.error("Failed to reject request")
        } finally {
            setLoadingUsers(prev => {
                const newSet = new Set(prev)
                newSet.delete(userId)
                return newSet
            })
        }
    }

    const getDisplayName = (user: User) => {
        if (user.name && user.lastname) return `${user.name} ${user.lastname}`
        return user.name || user.username || 'Unknown'
    }

    const renderUserCard = (user: User, isRequest: boolean = false) => (
        <Card key={user.id} className="hover:bg-muted/30 transition-colors border-border/50">
            <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                    {/* User Info */}
                    <Link 
                        href={`/profile/${user.username}`}
                        className="flex items-center gap-3 flex-1 min-w-0 group"
                    >
                        <Avatar className="h-12 w-12 ring-2 ring-transparent group-hover:ring-muted-foreground/20 transition-all">
                            <AvatarImage src={user.avatar || ''} alt={user.username ?? 'User'} />
                            <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                                {user.username?.charAt(0).toUpperCase() ?? '?'}
                            </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-foreground truncate">
                                    {getDisplayName(user)}
                                </h3>
                                {!isRequest && (
                                    <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-primary/10 text-primary">
                                        Following
                                    </Badge>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                                @{user.username}
                            </p>
                        </div>
                    </Link>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        {isRequest ? (
                            <>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleAcceptRequest(user.id)
                                    }}
                                    disabled={loadingUsers.has(user.id)}
                                    size="sm"
                                    className="gap-2 h-9 rounded-full font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                    {loadingUsers.has(user.id) ? (
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    ) : (
                                        <>
                                            <Check className="h-4 w-4" />
                                            <span className="hidden sm:inline">Accept</span>
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleRejectRequest(user.id)
                                    }}
                                    disabled={loadingUsers.has(user.id)}
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 h-9 rounded-full font-medium border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                >
                                    {loadingUsers.has(user.id) ? (
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    ) : (
                                        <>
                                            <X className="h-4 w-4" />
                                            <span className="hidden sm:inline">Decline</span>
                                        </>
                                    )}
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleUnfollow(user.id)
                                }}
                                disabled={loadingUsers.has(user.id)}
                                variant="outline"
                                size="sm"
                                className="gap-2 min-w-[100px] h-9 rounded-full font-medium border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                                {loadingUsers.has(user.id) ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                ) : (
                                    <>
                                        <UserMinus className="h-4 w-4" />
                                        <span>Unfollow</span>
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )

    if (showRequestsOnly) {
        return (
            <div className="w-full">
                {followRequests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                            <UserCheck className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">No pending requests</h3>
                        <p className="text-muted-foreground max-w-sm">
                            You don&apos;t have any pending follow requests at the moment.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {followRequests.map((user) => renderUserCard(user, true))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="w-full">
            {friends.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">No friends yet</h3>
                    <p className="text-muted-foreground max-w-sm">
                        Start following people to see them here.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {friends.map((friend) => renderUserCard(friend, false))}
                </div>
            )}
        </div>
    )
}

export default Friends