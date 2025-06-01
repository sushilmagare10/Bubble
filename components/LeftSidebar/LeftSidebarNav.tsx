import Link from 'next/link'
import React from 'react'
import { Users, Compass, Bookmark, Settings } from 'lucide-react'
import { Card, CardContent } from '../ui/card'

const LeftSidebarNav = () => {
    const navItems = [
        { 
            href: '/profile/friends', 
            icon: Users, 
            label: 'Friends', 
        },
        { 
            href: '/search-users', 
            icon: Compass, 
            label: 'Discover', 
        },
        { 
            href: '/saved', 
            icon: Bookmark, 
            label: 'Saved', 
        },
        { 
            href: '/settings', 
            icon: Settings, 
            label: 'Settings', 
        },
    ]

    return (
        <Card className="bg-card/50 border-border/70 shadow-sm rounded-xl">
            <CardContent className="p-4">
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group relative flex items-center gap-4 px-4 py-3 text-sm rounded-xl transition-all duration-200 hover:bg-neutral-900 hover:shadow-sm border border-transparent hover:border-border/50"
                        >
                            <div className="relative">
                                <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-200 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 -z-10" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                                    {item.label}
                                </div>
                            </div>
                        </Link>
                    ))}
                </nav>
            </CardContent>
        </Card>
    )
}

export default LeftSidebarNav