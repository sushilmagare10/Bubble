"use client"


import { Notification } from '@prisma/client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'


type NotificationModalProps = {
    isOpen: boolean
    onClose: () => void
    notifications: Notification[]
    onMarkAsRead: (id: string) => void
}

const NotificationModal = ({ isOpen, onClose, notifications, onMarkAsRead }: NotificationModalProps) => {
    const [showAll, setShowAll] = useState(false)

    if (!isOpen) return null

    const displayedNotifications = showAll ? notifications : notifications.slice(0, 10)



    return (
        <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center z-50 ">
            <div className="bg-card rounded-lg p-6 w-full max-w-5xl">
                <div className=' flex w-full justify-between items-center '>
                    <h2 className="text-3xl font-bold mb-4 text-primary/70 self-start">Notifications</h2>
                    <Button
                        onClick={onClose}
                        variant='outline'
                        className=" rounded-full font-semibold self-end"
                    >
                        X
                    </Button>
                </div>
                <div className="max-h-[80vh] max-w-5xl overflow-y-auto scrollbar-hide">
                    {displayedNotifications.map((notification) => (
                        <div key={notification.id} className="mb-4 flex flex-col items-start gap-2 p-2 border-b last:border-b-0">
                            <div className=' flex  items-center gap-3'>
                                <span className='w-10 h-10 rounded-full'>
                                    <Image
                                        src={notification.avatar || '/avatar.jpg'}
                                        alt={notification.content}
                                        width={40}
                                        height={40}
                                        className=' w-10 h-10 rounded-full object-cover'
                                    />
                                </span>
                                <span className=' text-primary font-semibold'>
                                    {notification.content}
                                </span>
                                <span className='text-base text-gray-600 '>
                                    {notification.msg}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
                            {!notification.isRead && (
                                <button
                                    onClick={() => onMarkAsRead(notification.id)}
                                    className="text-sm text-blue-500 mt-1"
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
                        className="mt-4 text-blue-500 hover:text-blue-600"
                    >
                        Show all notifications
                    </button>
                )}

            </div>
        </div>
    )
}

export default NotificationModal