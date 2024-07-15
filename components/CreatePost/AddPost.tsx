"use client"


import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import Image from 'next/image'
import { FaSquarePollHorizontal } from "react-icons/fa6";
import { MdInsertPhoto } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { BsCalendar2EventFill } from "react-icons/bs";
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { useUser } from '@clerk/nextjs';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { CldUploadWidget } from 'next-cloudinary';

import { useTheme } from 'next-themes'
import { addPost } from '@/lib/actions/addPost';


const AddPost = () => {

    const { isLoaded, user } = useUser()
    const [desc, setDesc] = useState('')
    const [img, setImg] = useState<any>()
    const [showEmoji, setShowEmoji] = useState(false)
    const { theme, systemTheme } = useTheme()

    if (!isLoaded) {
        return "Loading..."
    }

    const addEmoji = (e: any) => {
        const sym = e.unified.split("_");
        const codeArray: number[] = sym.map((el: string) => parseInt("0x" + el, 16));
        let emoji = String.fromCodePoint(...codeArray);
        setDesc(desc + emoji);
    };

    const currentTheme = theme === 'system' ? systemTheme : theme

    return (
        <Card className=' flex rounded-lg  p-4 dark:border-white/40 flex-col border justify-center items-start gap-4'>
            <CardTitle className=' font-semibold self-start text-sm'>Add Post</CardTitle>
            <CardContent className=' relative flex gap-4 p-0 w-full justify-between items-center -mt-1'>
                <form action={(formData) => addPost(formData, img || "")}>
                    <Textarea
                        rows={4}
                        value={desc}
                        name='description'
                        className='rounded-lg'
                        placeholder='What&apos;s on your mind?'
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <Image
                        src='/emoji.png'
                        alt='emoji'
                        width={20}
                        height={20}
                        className="w-5 h-5 cursor-pointer self-end"
                        onClick={() => setShowEmoji(!showEmoji)}
                    />
                    {showEmoji && (
                        <CardContent className=' absolute top-40 right-7 md:right-0 '>
                            <Picker
                                data={data}
                                emojiSize={20}
                                onEmojiSelect={addEmoji}
                                maxFrequentRows={2}
                                theme={currentTheme === "dark" ? 'dark' : "light"}
                            />
                        </CardContent>
                    )}
                </form>
            </CardContent>
            <CardContent className=' flex justify-between p-0 items-center gap-8'>
                <div className=' flex justify-center items-center gap-2 cursor-pointer'>
                    <CldUploadWidget
                        uploadPreset="Bubble_social"
                        onSuccess={(result: any, { widget }) => {
                            if (result.info && result.info.secure_url) {
                                setImg(result.info.secure_url);
                            };
                            widget.close()
                        }}
                    >
                        {({ open }) => {
                            return (
                                <>
                                    <CardDescription className=' flex items-center gap-2 cursor-pointer font-semibold'
                                        onClick={() => open()}
                                    >
                                        Photo
                                        <MdInsertPhoto className=' text-blue-500 text-xl' />
                                    </CardDescription>
                                </>
                            );
                        }}
                    </CldUploadWidget>

                </div>
                <div className=' flex justify-center items-center gap-2 cursor-pointer'>
                    <CardDescription className='font-semibold'>
                        Video
                    </CardDescription>
                    <FaYoutube className=' text-rose-500 text-xl' />
                </div>
                <div className=' flex justify-center items-center gap-2 cursor-pointer'>
                    <CardDescription className='font-semibold'>
                        Poll
                    </CardDescription>
                    <FaSquarePollHorizontal className=' text-green-500 text-xl' />
                </div>
                <div className=' flex justify-center items-center gap-2 cursor-pointer'>
                    <CardDescription className='font-medium'>
                        Event
                    </CardDescription>
                    <BsCalendar2EventFill className=' text-fuchsia-500 text-xl' />
                </div>
            </CardContent>
        </Card>
    )
}

export default AddPost