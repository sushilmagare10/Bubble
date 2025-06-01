"use client"

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Search, UserPlus, UserMinus, Clock, Users } from 'lucide-react'
import { searchUsers, getAllUsers } from '@/lib/actions/searchUsers'
import { switchFollow } from '@/lib/actions/switchFollow'
import { toast } from 'sonner'
import Link from 'next/link'

interface User {
    id: string
    username: string
    name: string | null
    lastname: string | null
    avatar: string | null
    isFollowing: boolean
    hasPendingRequest: boolean
}

const SearchUsers = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [users, setUsers] = useState<User[]>([])
    const [allUsers, setAllUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [followingUsers, setFollowingUsers] = useState<Set<string>>(new Set())

    useEffect(() => {
        const loadAllUsers = async () => {
            try {
                const fetchedUsers = await getAllUsers()
                setAllUsers(fetchedUsers)
                setUsers(fetchedUsers)
            } catch {
                toast.error("Failed to load users")
            }
        }

        loadAllUsers()
    }, [])

    useEffect(() => {
        const handleSearch = async () => {
            if (searchQuery.trim() === '') {
                setUsers(allUsers)
                return
            }

            if (searchQuery.trim().length < 2) return

            setLoading(true)
            try {
                const searchResults = await searchUsers(searchQuery.trim())
                setUsers(searchResults)
            } catch {
                toast.error("Failed to search users")
            } finally {
                setLoading(false)
            }
        }

        const debounceTimer = setTimeout(handleSearch, 300)
        return () => clearTimeout(debounceTimer)
    }, [searchQuery, allUsers])

    const handleFollow = async (userId: string) => {
        if (followingUsers.has(userId)) return

        setFollowingUsers(prev => new Set(prev).add(userId))

        try {
            await switchFollow(userId)

            const updateState = (list: User[]) =>
                list.map(user => {
                    if (user.id !== userId) return user

                    if (user.isFollowing) {
                        return { ...user, isFollowing: false, hasPendingRequest: false }
                    }

                    if (user.hasPendingRequest) {
                        return { ...user, hasPendingRequest: false }
                    }

                    return { ...user, hasPendingRequest: true }
                })

            setUsers(prev => updateState(prev))
            setAllUsers(prev => updateState(prev))

            toast.success("Follow status updated")
        } catch {
            toast.error("Failed to update follow status")
        } finally {
            setFollowingUsers(prev => {
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

    const getButtonContent = (user: User) => {
        if (followingUsers.has(user.id)) {
            return <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        }

        if (user.isFollowing) {
            return (
                <>
                    <UserMinus className="h-4 w-4" />
                    <span>Unfollow</span>
                </>
            )
        }

        if (user.hasPendingRequest) {
            return (
                <>
                    <Clock className="h-4 w-4" />
                    <span>Pending</span>
                </>
            )
        }

        return (
            <>
                <UserPlus className="h-4 w-4" />
                <span>Follow</span>
            </>
        )
    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="p-6 pb-4">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">Discover People</h1>
                </div>
                
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search people..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-12 bg-muted/20 border-muted-foreground/20 rounded-full text-base placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/40 transition-all"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
                {/* Loading State */}
                {loading && searchQuery && (
                    <div className="flex justify-center py-12">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                    </div>
                )}

                {/* Empty State */}
                {!loading && users.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                            <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">No people found</h3>
                        <p className="text-muted-foreground max-w-sm">
                            {searchQuery ? 'Try searching with different keywords' : 'No users available at the moment'}
                        </p>
                    </div>
                )}

                {/* Users List */}
                {!loading && users.length > 0 && (
                    <div className="space-y-3">
                        {users.map((user) => (
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
                                                    {user.isFollowing && (
                                                        <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-primary/10 text-primary">
                                                            Following
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground truncate">
                                                    @{user.username}
                                                </p>
                                                {user.hasPendingRequest && (
                                                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        Request sent
                                                    </p>
                                                )}
                                            </div>
                                        </Link>

                                        {/* Follow Button */}
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleFollow(user.id)
                                            }}
                                            disabled={followingUsers.has(user.id)}
                                            variant={user.isFollowing ? "outline" : "default"}
                                            size="sm"
                                            className={`gap-2 min-w-[80px] h-9 rounded-full font-medium transition-all ${
                                                user.isFollowing 
                                                    ? 'border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground' 
                                                    : user.hasPendingRequest 
                                                        ? 'bg-muted text-muted-foreground cursor-not-allowed border-muted' 
                                                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                                            }`}
                                        >
                                            {getButtonContent(user)}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchUsers