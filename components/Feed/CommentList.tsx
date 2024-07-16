"use client"


import Image from 'next/image'
import React, { useOptimistic, useState } from 'react'
import { Input } from '../ui/input'
import { MdMoreHoriz } from 'react-icons/md'
import { FaRegHeart } from 'react-icons/fa6'
import { Comment, User } from '@prisma/client'
import { useUser } from '@clerk/nextjs'
import { addComment } from '@/lib/actions/addComment'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

import { useTheme } from 'next-themes'

type CommentWithUser = Comment & { user: User };

const CommentList = (
    {
        comments,
        postId,
    }: {
        comments: CommentWithUser[];
        postId: number;
    }
) => {

    const { user } = useUser()

    const [commentState, setCommentState] = useState(comments)
    const [desc, setDesc] = useState('')
    const [showEmoji, setShowEmoji] = useState(false)
    const { theme, systemTheme } = useTheme()

    const addEmoji = (e: any) => {
        const sym = e.unified.split("_");
        const codeArray: number[] = sym.map((el: string) => parseInt("0x" + el, 16));
        let emoji = String.fromCodePoint(...codeArray);
        setDesc(desc + emoji);
    };

    const currentTheme = theme === 'system' ? systemTheme : theme


    const add = async () => {
        if (!user || !desc) return;

        addOptimisticComment({
            id: Math.random(),
            desc,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            userId: user.id,
            postId: postId,
            user: {
                id: user.id,
                username: "Sending Please Wait...",
                avatar: user.imageUrl || "/noAvatar.png",
                cover: "",
                description: "",
                name: "",
                lastname: "",
                city: "",
                work: "",
                school: "",
                website: "",
                createdAt: new Date(Date.now()),
            },
        });
        try {
            const createdComment = await addComment(postId, desc);
            setCommentState((prev) => [createdComment, ...prev]);
        } catch (err) { }
    };

    const [optimistcComments, addOptimisticComment] = useOptimistic(
        commentState, (state, value: CommentWithUser) => [value, ...state]
    )

    return (
        <>
            {user && (<div className='relative -mt-4'>
                <div className='  flex justify-between items-center p-4 gap-4'>
                    <Image
                        src={user?.imageUrl || '/avatar.jpg'}
                        alt='ProfilePic'
                        width={36}
                        height={36}
                        className='w-9 h-9 object-cover rounded-full'
                    />
                    <form action={add} className=' flex-1 flex items-center justify-between bg-secondary rounded-full text-sm px-6  w-full'>
                        <Input
                            type='text'
                            value={desc}
                            placeholder='Write a comment...'
                            className='bg-transparent outline-none flex-1 ring-0 border-none focus-visible:ring-none'
                            onChange={e => setDesc(e.target.value)}
                        />
                        <Image
                            src="/emoji.png"
                            alt=""
                            width={16}
                            height={16}
                            className="cursor-pointer"
                            onClick={() => setShowEmoji(!showEmoji)}
                        />
                        {showEmoji && (
                            <div className=' z-20 absolute bottom-[95%] right-5 md:right-0 '>
                                <Picker
                                    data={data}
                                    emojiSize={20}
                                    onEmojiSelect={addEmoji}
                                    maxFrequentRows={2}
                                    theme={currentTheme === "dark" ? 'dark' : "light"}
                                />
                            </div>
                        )}
                    </form>
                </div>

                {optimistcComments.map((comment) => (
                    <div className=' flex gap-4 px-6 py-4 -mt-4' key={comment.id}>
                        <Image
                            src={comment.user.avatar || '/avatar.jpg'}
                            alt={comment.user.username}
                            width={40}
                            height={40}
                            className='w-10 h-10 object-cover rounded-full'
                        />
                        <div className=' flex flex-col self-start justify-center gap-2 text-gray-500'>
                            <div className=' w-full flex justify-between items-center'>
                                <span className=' text-base font-semibold self-start'>
                                    {comment.user.name && comment.user.lastname
                                        ? comment.user.name + " " + comment.user.lastname
                                        : comment.user.username}
                                </span>
                                <MdMoreHoriz className='text-xl' />
                            </div>
                            <p className='text-xs font-medium'>
                                {comment.desc}
                            </p>
                            <div className=' flex justify-start text-xs items-center gap-4'>
                                <div className=' flex items-center gap-4 bg-secondary py-1 px-3 rounded-full'>
                                    <FaRegHeart className=' fill-primary' />
                                    <span className='text-gray-300'>|</span>
                                    <span className=' text-gray-500'>87<span className=' hidden md:inline ml-2'>Likes</span></span>
                                </div>
                                <p className='text-gray-500 font-medium'>Replay</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            )}
        </>
    )
}

export default CommentList