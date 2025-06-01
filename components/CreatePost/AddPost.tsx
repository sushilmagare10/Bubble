"use client"

import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import Image from 'next/image'
import { FaSquarePollHorizontal } from "react-icons/fa6";
import { MdInsertPhoto } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { BsCalendar2EventFill } from "react-icons/bs";
import { Card, CardContent } from '../ui/card';
import { useUser } from '@clerk/nextjs';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { CldUploadWidget } from 'next-cloudinary';
import { useTheme } from 'next-themes'
import { addPost } from '@/lib/actions/addPost';
import AddPostButton from './AddPostButton';

const AddPost = () => {
    const { isLoaded, user } = useUser()
    const [desc, setDesc] = useState('')
    const [img, setImg] = useState<any>()
    const [showEmoji, setShowEmoji] = useState(false)
    const { theme, systemTheme } = useTheme()

    if (!isLoaded) {
        return (
            <Card className="p-6">
                <div className="flex items-center justify-center">
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-solid border-current border-e-transparent" />
                </div>
            </Card>
        )
    }

    const addEmoji = (e: any) => {
        const sym = e.unified.split("_");
        const codeArray: number[] = sym.map((el: string) => parseInt("0x" + el, 16));
        let emoji = String.fromCodePoint(...codeArray);
        setDesc(desc + emoji);
    };

    const currentTheme = theme === 'system' ? systemTheme : theme

    return (
        <Card className="border-border/70 bg-card/50 rounded-xl shadow-sm">
            <CardContent className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Image
                        src={user?.imageUrl || '/avatar.jpg'}
                        alt="Your avatar"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium text-foreground">What&apos;s on your mind?</span>
                </div>

                {/* Form */}
                <form 
                    className="space-y-4" 
                    action={(formData) => addPost(formData, img || "")}
                >
                    <div className="relative">
                        <Textarea
                            rows={3}
                            value={desc}
                            name="description"
                            className="resize-none rounded-xl border-0 bg-muted/30 focus-visible:ring-1 focus-visible:ring-ring"
                            placeholder="Share your thoughts..."
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        
                        {/* Emoji Picker Toggle */}
                        <button
                            type="button"
                            onClick={() => setShowEmoji(!showEmoji)}
                            className="absolute bottom-3 right-3 p-1 hover:bg-muted/50 rounded-full transition-colors"
                        >
                            <Image
                                src="/emoji.png"
                                alt="Add emoji"
                                width={20}
                                height={20}
                                className="w-5 h-5"
                            />
                        </button>

                        {/* Emoji Picker */}
                        {showEmoji && (
                            <div className="absolute top-full right-0 mt-2 z-20">
                                <Picker
                                    data={data}
                                    emojiSize={20}
                                    onEmojiSelect={addEmoji}
                                    maxFrequentRows={2}
                                    theme={currentTheme === "dark" ? 'dark' : "light"}
                                />
                            </div>
                        )}
                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4">
                            {/* Photo Upload */}
                            <CldUploadWidget
                                uploadPreset="Bubble_social"
                                onSuccess={(result: any, { widget }) => {
                                    if (result.info && result.info.secure_url) {
                                        setImg(result.info.secure_url);
                                    }
                                    widget.close()
                                }}
                            >
                                {({ open }) => (
                                    <button
                                        type="button"
                                        onClick={() => open()}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted/50 transition-colors text-sm font-medium"
                                    >
                                        <MdInsertPhoto className="w-4 h-4 text-blue-500" />
                                        <span className="text-muted-foreground">Photo</span>
                                    </button>
                                )}
                            </CldUploadWidget>

                            {/* Video */}
                            <button
                                type="button"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted/50 transition-colors text-sm font-medium"
                            >
                                <FaYoutube className="w-4 h-4 text-red-500" />
                                <span className="text-muted-foreground">Video</span>
                            </button>

                            {/* Poll */}
                            <button
                                type="button"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted/50 transition-colors text-sm font-medium"
                            >
                                <FaSquarePollHorizontal className="w-4 h-4 text-green-500" />
                                <span className="text-muted-foreground">Poll</span>
                            </button>

                            {/* Event */}
                            <button
                                type="button"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted/50 transition-colors text-sm font-medium"
                            >
                                <BsCalendar2EventFill className="w-4 h-4 text-purple-500" />
                                <span className="text-muted-foreground">Event</span>
                            </button>
                        </div>

                        <AddPostButton />
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default AddPost