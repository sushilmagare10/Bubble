"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, useAuth, UserButton } from '@clerk/nextjs'
import { GoPeople } from "react-icons/go";
import { TbMessageDots } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Search } from 'lucide-react';
import { ModeToggle } from '../theme-toggle';
import NotificationModal from '../NotificationModal';
import { fetchNotifications, markNotificationAsRead } from '@/lib/actions/fetchNotification'
import { Notification } from '@prisma/client'

const Navbar = () => {
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)
    const [notifications, setNotifications] = useState<Notification[]>([])

    useEffect(() => {
        const getNotifications = async () => {
            try {
                const fetchedNotifications = await fetchNotifications()
                setNotifications(fetchedNotifications)
            } catch (error) {
                console.error("Failed to fetch notifications:", error)
            }
        }

        getNotifications()
    }, [])

    const unreadNotificationsCount = notifications.filter(n => !n.isRead).length

    const handleMarkAsRead = async (notificationId: string) => {
        try {
            await markNotificationAsRead(notificationId)
            setNotifications(notifications.map(n =>
                n.id === notificationId ? { ...n, isRead: true } : n
            ))
        } catch (error) {
            console.error("Failed to mark notification as read:", error)
        }
    }
    
    const { userId } = useAuth()

    if (!userId) {
        return (
            <div className="flex h-16 items-center justify-center border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
            </div>
        );
    }

    return (
        <nav className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
                {/* Logo */}
                <Link 
                    href='/' 
                    className="flex items-center space-x-2 transition-colors hover:text-foreground/80"
                >
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">B</span>
                    </div>
                    <span className="hidden font-bold text-xl tracking-tight sm:inline-block">
                        Bubble
                    </span>
                </Link>

                {/* Center Search - Hidden on mobile */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                            type="text" 
                            placeholder="Search..." 
                            className="w-full pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-ring"
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-2">
                    <ClerkLoading>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                    </ClerkLoading>
                    
                    <ClerkLoaded>
                        <SignedIn>
                            {/* Action Buttons */}
                            <div className="hidden md:flex items-center space-x-1">
                                <Link href='/search-users' className="inline-flex items-center justify-center rounded-md h-9 w-9 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                    <GoPeople className="h-5 w-5" />
                                </Link>
                                
                                <button className="inline-flex items-center justify-center rounded-md h-9 w-9 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                    <TbMessageDots className="h-5 w-5" />
                                </button>
                                
                                <button 
                                    onClick={() => setIsNotificationModalOpen(true)}
                                    className="relative inline-flex items-center justify-center rounded-md h-9 w-9 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                >
                                    <IoMdNotificationsOutline className="h-5 w-5" />
                                    {unreadNotificationsCount > 0 && (
                                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-medium">
                                            {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Mobile Search Button */}
                            <button className="inline-flex md:hidden items-center justify-center rounded-md h-9 w-9 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                <Search className="h-5 w-5" />
                            </button>

                            {/* Notification Modal */}
                            <NotificationModal
                                isOpen={isNotificationModalOpen}
                                onClose={() => setIsNotificationModalOpen(false)}
                                notifications={notifications}
                                onMarkAsRead={handleMarkAsRead}
                            />

                            {/* Separator */}
                            <div className="h-6 w-px bg-border" />
                            
                            {/* User Button */}
                            <div className="flex items-center">
                                <UserButton 
                                    appearance={{
                                        elements: {
                                            avatarBox: "h-8 w-8",
                                            userButtonPopoverCard: "shadow-lg border border-border",
                                            userButtonPopoverActions: "text-muted-foreground"
                                        }
                                    }}
                                />
                            </div>
                        </SignedIn>
                        
                        <SignedOut>
                            <Link 
                                href="/sign-in"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90"
                            >
                                Sign In
                            </Link>
                        </SignedOut>
                    </ClerkLoaded>
                    
                    {/* Theme Toggle */}
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}

export default Navbar