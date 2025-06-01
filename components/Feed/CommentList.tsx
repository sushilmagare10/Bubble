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
import { Button } from '../ui/button'

type CommentWithUser = Comment & { user: User };

const CommentList = ({
    comments,
    postId,
}: {
    comments: CommentWithUser[];
    postId: number;
}) => {
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
            setDesc(''); // Clear input after successful submission
        } catch (err) {
            console.error('Failed to add comment:', err);
        }
    };

    const [optimistcComments, addOptimisticComment] = useOptimistic(
        commentState, 
        (state, value: CommentWithUser) => [value, ...state]
    )

    return (
        <div className="space-y-4 pb-10 ">
            {/* Comment Input */}
            {user && (
                <div className="relative">
                    <div className="flex items-start gap-3 p-4">
                        <Image
                            src={user?.imageUrl || '/avatar.jpg'}
                            alt="Your avatar"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover rounded-full flex-shrink-0"
                        />
                        
                        <form action={add} className="flex-1 relative">
                            <div className="flex items-center bg-muted/30 rounded-xl p-2 gap-2">
                                <Input
                                    type="text"
                                    value={desc}
                                    placeholder="Write a comment..."
                                    className="bg-transparent border-0 focus:outline-none  focus-visible:ring-0 text-sm rounded-xl flex-1 p-0"
                                    onChange={e => setDesc(e.target.value)}
                                />
                                
                                <button
                                    type="button"
                                    onClick={() => setShowEmoji(!showEmoji)}
                                    className="p-1 hover:bg-muted/50 rounded-full transition-colors"
                                >
                                    <Image
                                        src="/emoji.png"
                                        alt="Add emoji"
                                        width={16}
                                        height={16}
                                        className="w-4 h-4"
                                    />
                                </button>
                            </div>

                            {/* Emoji Picker */}
                            {showEmoji && (
                                <div className="absolute bottom-full right-0 mb-2 z-20">
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
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-4">
                {optimistcComments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 px-4">
                        <Image
                            src={comment.user.avatar || '/avatar.jpg'}
                            alt={comment.user.username}
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover rounded-full flex-shrink-0"
                        />
                        
                        <div className="flex-1 space-y-2">
                            {/* Comment Header */}
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-sm text-foreground">
                                    {comment.user.name && comment.user.lastname
                                        ? `${comment.user.name} ${comment.user.lastname}`
                                        : comment.user.username
                                    }
                                </span>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <MdMoreHoriz className="w-4 h-4 text-muted-foreground" />
                                </Button>
                            </div>

                            {/* Comment Content */}
                            <p className="text-sm text-foreground">
                                {comment.desc}
                            </p>

                            {/* Comment Actions */}
                            <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-2 bg-muted/30 px-3 py-1 rounded-full">
                                    <FaRegHeart className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-muted-foreground">87</span>
                                    <span className="hidden md:inline text-muted-foreground">Likes</span>
                                </div>
                                <button className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                                    Reply
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommentList