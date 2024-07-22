"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, useAuth, UserButton } from '@clerk/nextjs'
import { GoPeople } from "react-icons/go";
import { TbMessageDots } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
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
        return <div>Loading...</div>;
    }



    return (
        <div className=' flex w-full justify-between items-center h-24 '>
            {/* left */}
            <Link href='/' className=' lg:block font-bold text-lg md:text-xl lg:text-2xl 2xl:text-4xl text-primary w-[20%]'>
                Bubble
            </Link>
            {/* right */}
            <div className="w-[40%] flex items-center gap-4 xl:gap-8 justify-end">
                {/* center */}
                <div className='hidden xl:flex p-2 items-center rounded-lg'>
                    <Input type='text' placeholder='search...' className=' rounded-lg outline-none' />
                </div>

                <ClerkLoading>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <div className="hidden md:block cursor-pointer">
                            <GoPeople className='text-primary text-2xl' />
                        </div>
                        <div className="hidden md:block cursor-pointer">
                            <TbMessageDots className=' text-primary text-2xl' />
                        </div>
                        <div className="cursor-pointer relative" onClick={() => setIsNotificationModalOpen(true)}>
                            <IoMdNotificationsOutline className='text-primary text-2xl' />
                            {unreadNotificationsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {unreadNotificationsCount}
                                </span>
                            )}
                        </div>
                        <NotificationModal
                            isOpen={isNotificationModalOpen}
                            onClose={() => setIsNotificationModalOpen(false)}
                            notifications={notifications}
                            onMarkAsRead={handleMarkAsRead}
                        />
                        <div className='hidden md:block'>

                            <UserButton />
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <div className="flex items-center gap-2 text-sm">
                            <Link href="/sign-in">Login/Register</Link>
                        </div>
                    </SignedOut>
                </ClerkLoaded>
                <ModeToggle />

            </div>
        </div>
    )
}

export default Navbar