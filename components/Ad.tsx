import Image from 'next/image'
import React from 'react'
import { MdMoreHoriz } from "react-icons/md";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
    return (
        <div className=' flex w-full flex-col gap-4 bg-card shadow-xl rounded-lg p-4 border'>
            <div className='w-full flex flex-col gap-3 justify-between items-center'>
                <div className='flex w-full justify-between items-center gap-4'>
                    <span className=' text-sm font-semibold text-gray-500'>
                        Sponsored Ad
                    </span>
                    <MdMoreHoriz className='text-2xl' />
                </div>
            </div>
            <div
                className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
            >
                <div
                    className={`relative w-full ${size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
                        }`}
                >
                    <Image
                        src="/macbook.webp"
                        alt=""
                        fill
                        className="rounded-lg object-contain"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <Image
                        src="/macbook.webp"
                        alt=""
                        width={24}
                        height={24}
                        className="rounded-full w-6 h-6 object-contain"
                    />
                    <span className="text-blue-500 font-medium">Macbook M3</span>
                </div>
                <p className={size === "sm" ? "text-xs" : "text-sm"}>
                    {size === "sm"
                        ? "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        : size === "md"
                            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit."
                            : "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                </p>
                <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">
                    Learn more
                </button>
            </div>
        </div>
    )
}

export default Ad