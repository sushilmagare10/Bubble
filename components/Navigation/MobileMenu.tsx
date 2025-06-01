"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, MessageCircle, User, Bell } from "lucide-react";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface NavItem {
    href: string;
    icon: typeof Home;
    label: string;
}

const navItems: NavItem[] = [
    {
        href: "/",
        icon: Home,
        label: "Home"
    },
    {
        href: "/search",
        icon: Search,
        label: "Search"
    },
    {
        href: "/messages",
        icon: MessageCircle,
        label: "Messages"
    },
    {
        href: "/notifications",
        icon: Bell,
        label: "Notifications"
    },
    {
        href: "/profile",
        icon: User,
        label: "Profile"
    }
];

const MobileMenu = () => {
    const pathname = usePathname();

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border">
            <div className="flex items-center justify-around px-2 py-2">
                {navItems.slice(0, 4).map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || 
                        (item.href !== "/" && pathname.startsWith(item.href));
                    
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 min-w-[60px]",
                                "hover:bg-muted/50 active:scale-95",
                                isActive 
                                    ? "text-primary bg-primary/10" 
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon 
                                className={cn(
                                    "h-6 w-6 transition-all duration-200",
                                    isActive ? "scale-110" : ""
                                )} 
                            />
                        </Link>
                    );
                })}
                
                {/* User Avatar/Auth */}
                <div className="flex flex-col items-center justify-center p-3 rounded-xl min-w-[60px]">
                    <ClerkLoading>
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                    </ClerkLoading>
                    <ClerkLoaded>
                        <SignedIn>
                            <div className="relative">
                                <UserButton 
                                    appearance={{
                                        elements: {
                                            avatarBox: "h-7 w-7 rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all",
                                            userButtonPopoverCard: "bg-card border-border",
                                            userButtonPopoverActions: "bg-card",
                                        }
                                    }}
                                />
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <Link 
                                href="/sign-in"
                                className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                            >
                                <User className="h-4 w-4" />
                            </Link>
                        </SignedOut>
                    </ClerkLoaded>
                </div>
            </div>
            
            {/* Safe area for devices with bottom gestures */}
            <div className="h-safe-area-inset-bottom bg-background/95" />
        </div>
    );
};

export default MobileMenu;