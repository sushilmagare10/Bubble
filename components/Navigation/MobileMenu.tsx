"use client";

import Link from "next/link";
import { IoMdHome, IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbMessageDots, TbMessage } from "react-icons/tb";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";


const MobileMenu = () => {


    return (
        <div className="md:hidden mx-auto sticky bottom-5 bg-card shadow-2xl rounded-lg border border-black/55 dark:border-white/40 w-[95%]">

            <div className="flex justify-between items-center  py-4 px-6 w-full"
            >
                <Link href="/">
                    <IoMdHome className="text-3xl" />
                </Link>
                <Link href="/">
                    <TbMessage className="text-3xl" />
                </Link>
                <Link href="/">
                    <CgProfile className="text-3xl" />
                </Link>
                <ClerkLoading>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <div className="flex items-center gap-2 text-sm">
                            <Link href="/sign-in">Login/Register</Link>
                        </div>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </div>
    );
};

export default MobileMenu;
