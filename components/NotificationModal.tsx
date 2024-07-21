"use client"

import { Notification } from '@prisma/client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'

type NotificationModalProps = {
    isOpen: boolean
    onClose: () => void
    notifications: Notification[]
    onMarkAsRead: (id: string) => void
}

const NotificationModal = ({ isOpen, onClose, notifications, onMarkAsRead }: NotificationModalProps) => {
    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) {
                onClose()
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isOpen, onClose])

    const displayedNotifications = showAll ? notifications : notifications.slice(0, 10)

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="fixed top-20 md:left-[59%] left-24 shadow-lg z-50 flex items-center justify-center"
                >
                    <div className="bg-card rounded-lg p-4 sm:p-6 border-black/40 dark:border-white/40 w-full max-w-2xl border max-h-[90vh] flex flex-col gap-3">
                        <div className='flex w-full justify-between items-center mb-4'>
                            <h2 className="text-xl sm:text-2xl font-bold text-primary/70">Notifications</h2>
                            <Button
                                onClick={onClose}
                                variant='outline'
                                className="rounded-full p-2 sm:p-4 w-8 h-8 sm:w-10 sm:h-10 font-semibold"
                            >
                                X
                            </Button>
                        </div>
                        <div className="flex-grow overflow-y-auto scrollbar-hide">
                            {displayedNotifications.map((notification) => (
                                <div key={notification.id} className="mb-4 flex flex-col items-start gap-2 p-2 border-b last:border-b-0">
                                    <div className='flex flex-col sm:flex-row w-full items-start sm:items-center gap-3'>
                                        <span className='w-10 h-10 rounded-full flex-shrink-0'>
                                            <Image
                                                src={notification.avatar || '/avatar.jpg'}
                                                alt={notification.content}
                                                width={36}
                                                height={36}
                                                className='w-9 h-9 rounded-full object-cover'
                                            />
                                        </span>
                                        <div className='flex-grow'>
                                            <span className='text-primary text-sm font-semibold block sm:inline'>
                                                {notification.content}
                                            </span>
                                            <span className='text-sm  text-gray-600 block sm:inline sm:ml-2'>
                                                {notification.msg}
                                            </span>
                                        </div>
                                        <div className='relative flex w-14 h-14 mt-2 sm:mt-0 '>
                                            <Image
                                                src={notification.postImage || '/banner.jpg'}
                                                alt={notification.content}
                                                fill
                                                className='object-cover rounded-lg'
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
                                    {!notification.isRead && (
                                        <button
                                            onClick={() => onMarkAsRead(notification.id)}
                                            className="text-xs sm:text-sm text-blue-500 mt-1"
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        {!showAll && notifications.length > 10 && (
                            <button
                                onClick={() => setShowAll(true)}
                                className="mt-4 text-blue-500 hover:text-blue-600 text-sm sm:text-base"
                            >
                                Show all notifications
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default NotificationModal