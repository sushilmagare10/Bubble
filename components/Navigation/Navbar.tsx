import Link from 'next/link'
import React from 'react'
import { Input } from '../ui/input'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import MobileMenu from './MobileMenu'

const Navbar = () => {
    return (
        <div className=' flex justify-between items-center h-24 '>
            {/* left */}
            <div className='md:hidden lg:block font-bold text-lg md:text-xl lg:text-2xl 2xl:text-3xl text-blue-500 w-[20%]'>Bubble</div>
            {/* center */}
            <div className='hidden md:flex w-[60%] text-sm items-center justify-evenly'>
                <div className=' flex justify-between text-gray-600 items-center gap-6'>
                    <Link href='/' className='hover:text-blue-500'>
                        Home
                    </Link>
                    <Link href='/' className='hover:text-blue-500'>
                        Friends
                    </Link>
                    <Link href='/' className='hover:text-blue-500'>
                        Stroies
                    </Link>
                </div>
                <div className='hidden xl:flex p-2 items-center rounded-xl'>
                    <Input type='text' placeholder='search...' />
                </div>
            </div>
            {/* right */}
            <div className="w-[20%] flex items-center gap-4 xl:gap-8 justify-end">
                <ClerkLoading>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <div className="cursor-pointer">
                            {/* <Image src="/people.png" alt="" width={24} height={24} /> */}
                        </div>
                        <div className="cursor-pointer">
                            {/* <Image src="/messages.png" alt="" width={20} height={20} /> */}
                        </div>
                        <div className="cursor-pointer">
                            {/* <Image src="/notifications.png" alt="" width={20} height={20} /> */}
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
                <MobileMenu />
            </div>
        </div>
    )
}

export default Navbar