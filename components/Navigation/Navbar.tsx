import Link from 'next/link'
import React from 'react'
import { Input } from '../ui/input'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { GoPeople } from "react-icons/go";
import { TbMessageDots } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import MobileMenu from './MobileMenu'
import { ModeToggle } from '../theme-toggle';

const Navbar = () => {
    return (
        <div className=' flex justify-between items-center h-24 '>
            {/* left */}
            <div className='md:hidden lg:block font-bold text-lg md:text-xl lg:text-2xl 2xl:text-4xl text-primary w-[20%]'>Bubble</div>
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
                        <div className="cursor-pointer">
                            <GoPeople className='text-primary text-2xl' />
                        </div>
                        <div className="cursor-pointer">
                            <TbMessageDots className=' text-primary text-2xl' />
                        </div>
                        <div className="cursor-pointer">
                            <IoMdNotificationsOutline className='text-primary text-2xl' />
                        </div>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <div className="flex items-center gap-2 text-sm">
                            {/* <Image src="/login.png" alt="" width={20} height={20} /> */}
                            <Link href="/sign-in">Login/Register</Link>
                        </div>
                    </SignedOut>
                </ClerkLoaded>
                <ModeToggle />
                <MobileMenu />
            </div>
        </div>
    )
}

export default Navbar