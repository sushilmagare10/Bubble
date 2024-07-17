"use client"


import { addStory } from '@/lib/actions/addStory';
import { useUser } from '@clerk/nextjs';
import { Story, User } from '@prisma/client';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image'
import React, { useOptimistic, useState } from 'react'
import { Button } from '../ui/button';

type StoryWithUser = Story & {
    user: User;
};


const StoryItem = ({
    stories,
    userId,
}: {
    stories: StoryWithUser[];
    userId: string;
}) => {


    const [storyItem, setStoryItem] = useState(stories);
    const [img, setImg] = useState<any>();

    const { user, isLoaded } = useUser();

    const add = async () => {
        if (!img?.secure_url) return;

        addOptimisticStory({
            id: Math.random(),
            img: img.secure_url,
            createdAt: new Date(Date.now()),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            userId: userId,
            user: {
                id: userId,
                username: "Sending...",
                avatar: user?.imageUrl || "/noAvatar.png",
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
            const createdStory = await addStory(img.secure_url);
            setStoryItem((prev) => [createdStory!, ...prev]);
            setImg(null)
        } catch (err) { }
    };

    const [optimisticStories, addOptimisticStory] = useOptimistic(
        storyItem,
        (state, value: StoryWithUser) => [value, ...state]
    );

    return (
        <>
            <CldUploadWidget
                uploadPreset="Bubble_social"
                onSuccess={(result, { widget }) => {
                    setImg(result.info);
                    widget.close();
                }}
            >
                {({ open }) => {
                    return (
                        <div className="flex flex-col items-center gap-2 cursor-pointer relative">
                            <div className="relative w-20 h-20">
                                <Image
                                    src={img?.secure_url || user?.imageUrl || "/avatar.jpg"}
                                    alt=""
                                    width={80}
                                    height={80}
                                    className="w-20 h-20 rounded-full ring-2 object-cover"

                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-full"
                                    onClick={() => open()} />
                            </div>
                            {img ? (
                                <form action={add}>
                                    <Button className="text-xs  rounded-md text-white">
                                        Send
                                    </Button>
                                </form>
                            ) : (
                                <span className="font-semibold">Add a Story</span>
                            )}
                            <div className="absolute text-4xl text-gray-200 top-[18px]">+</div>
                        </div>
                    );
                }}
            </CldUploadWidget>
            {/* STORY */}
            {optimisticStories.map((story) => (
                <div
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    key={story.id}
                >
                    <Image
                        src={story.user.avatar || "/avatar.jpg"}
                        alt=""
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full ring-2"
                    />
                    <span className="font-medium">
                        {story.user.name || story.user.username}
                    </span>
                </div>
            ))}
        </>
    )
}

export default StoryItem