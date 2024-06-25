"use client";

import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="md:hidden">
            <div
                className="flex flex-col gap-[4.5px] cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div
                    className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? "rotate-45" : ""
                        } origin-left ease-in-out duration-500`}
                />
                <div
                    className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? "opacity-0" : ""
                        } ease-in-out duration-500`}
                />
                <div
                    className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? "-rotate-45" : ""
                        } origin-left ease-in-out duration-500`}
                />
            </div>
            <div
                className={`absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-slate-50 flex transition-transform duration-300 ease-linear flex-col items-center justify-center gap-8 font-medium text-xl z-10 transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
                style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
            >
                <Link href="/">Home</Link>
                <Link href="/">Friends</Link>
                <Link href="/">Groups</Link>
                <Link href="/">Stories</Link>
                <Link href="/">Login</Link>
            </div>
        </div>
    );
};

export default MobileMenu;
