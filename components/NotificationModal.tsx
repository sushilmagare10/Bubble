"use client"

import { Notification } from '@prisma/client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell } from 'lucide-react'

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
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />
                    
                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 md:left-[59%] md:translate-x-0 z-50 w-full max-w-md mx-4 md:mx-0"
                    >
                        <div className="bg-card border-border/50 rounded-xl shadow-lg max-h-[80vh] flex flex-col overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-border/80 bg-muted/30">
                                <div className="flex items-center gap-2">
                                    <Bell className="h-4 w-4 text-muted-foreground" />
                                    <h2 className="font-semibold text-foreground">Notifications</h2>
                                    {notifications.filter(n => !n.isRead).length > 0 && (
                                        <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                                            {notifications.filter(n => !n.isRead).length}
                                        </span>
                                    )}
                                </div>
                                <Button
                                    onClick={onClose}
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-muted"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto">
                                {displayedNotifications.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                                        <div className="bg-muted rounded-full p-3 mb-3">
                                            <Bell className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <p className="text-sm text-muted-foreground font-medium">No notifications yet</p>
                                        <p className="text-xs text-muted-foreground mt-1">We&apos;ll notify you when something happens</p>
                                    </div>
                                ) : (
                                    <div className="divide-y">
                                        {displayedNotifications.map((notification) => (
                                            <div 
                                                key={notification.id} 
                                                className={`p-4 hover:bg-muted/50 transition-colors ${
                                                    !notification.isRead ? 'bg-muted/30' : ''
                                                }`}
                                            >
                                                <div className="flex gap-3">
                                                    {/* Avatar */}
                                                    <div className="flex-shrink-0">
                                                        <div className="relative w-9 h-9">
                                                            <Image
                                                                src={notification.avatar || '/avatar.jpg'}
                                                                alt={notification.content}
                                                                fill
                                                                className="rounded-full object-cover"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div className="flex-1">
                                                                <p className="text-sm">
                                                                    <span className="font-medium text-foreground">
                                                                        {notification.content}
                                                                    </span>
                                                                    <span className="text-muted-foreground ml-1">
                                                                        {notification.msg}
                                                                    </span>
                                                                </p>
                                                                <p className="text-xs text-muted-foreground mt-1">
                                                                    {new Date(notification.createdAt).toLocaleString()}
                                                                </p>
                                                            </div>

                                                            {/* Post Image */}
                                                            {notification.postImage && (
                                                                <div className="flex-shrink-0 w-10 h-10 relative">
                                                                    <Image
                                                                        src={notification.postImage}
                                                                        alt="Post"
                                                                        fill
                                                                        className="rounded object-cover"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Mark as read button */}
                                                        {!notification.isRead && (
                                                            <button
                                                                onClick={() => onMarkAsRead(notification.id)}
                                                                className="text-xs text-primary hover:text-primary/80 mt-2 font-medium"
                                                            >
                                                                Mark as read
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {!showAll && notifications.length > 10 && (
                                <div className="p-4 border-t bg-muted/30">
                                    <button
                                        onClick={() => setShowAll(true)}
                                        className="w-full text-sm text-primary hover:text-primary/80 font-medium"
                                    >
                                        Show all notifications
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default NotificationModal