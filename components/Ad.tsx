import Image from 'next/image'
import React from 'react'
import { MdMoreHoriz } from "react-icons/md";
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { Button } from './ui/button';

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
    return (
        <Card className=' flex w-full flex-col gap-4 shadow-md rounded-lg p-4 dark:border-white/40'>
            <CardContent className='w-full flex flex-col gap-3 p-0 justify-between items-center'>
                <div className='flex w-full justify-between items-center gap-4'>
                    <CardDescription className=' text-sm font-semibold text-gray-500'>
                        Sponsored Ad
                    </CardDescription>
                    <MdMoreHoriz className='text-2xl' />
                </div>
            </CardContent>
            <CardContent
                className={`flex flex-col p-0 mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
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
                    <CardTitle className="text-primary self-start font-medium">Macbook M3</CardTitle>
                </div>
                <CardDescription className={size === "sm" ? "text-xs" : "text-sm"}>
                    {size === "sm"
                        ? "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        : size === "md"
                            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit."
                            : "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                </CardDescription>
                <Button className=" mt-2 " variant='outline'>
                    Learn more
                </Button>
            </CardContent>
        </Card>
    )
}

export default Ad