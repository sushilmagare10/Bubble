"use client"

import { addStory } from '@/lib/actions/addStory';
import { useUser } from '@clerk/nextjs';
import { Story, User } from '@prisma/client';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image'
import React, { useOptimistic, useState } from 'react'
import { Button } from '../ui/button';
import StoryModal from './StoryModal';
import { Plus, Send } from 'lucide-react';

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
    const [selectedStory, setSelectedStory] = useState<StoryWithUser | null>(null);

    const { user, isLoaded } = useUser();

    const openStoryModal = (story: StoryWithUser) => {
        setSelectedStory(story);
    };

    const closeStoryModal = () => {
        setSelectedStory(null);
    };

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
                        <div className="flex flex-col items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-dashed border-muted-foreground/30 group-hover:border-primary/50 transition-colors duration-200">
                                    <Image
                                        src={img?.secure_url || user?.imageUrl || "/avatar.jpg"}
                                        alt=""
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div 
                                    className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    onClick={() => open()}
                                >
                                    <Plus className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            {img ? (
                                <form action={add}>
                                    <Button size="sm" className="h-8 px-4 text-xs gap-1">
                                        <Send className="w-3 h-3" />
                                        Send
                                    </Button>
                                </form>
                            ) : (
                                <span className="text-xs font-medium text-muted-foreground">Add Story</span>
                            )}
                        </div>
                    );
                }}
            </CldUploadWidget>

            {/* STORIES */}
            {optimisticStories.map((story) => (
                <div
                    className="flex flex-col items-center gap-3 cursor-pointer group"
                    key={story.id}
                    onClick={() => openStoryModal(story)}
                >
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/60 transition-colors duration-200">
                            <Image
                                src={story.img || "/avatar.jpg"}
                                alt=""
                                width={80}
                                height={80}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                    <span className="text-xs font-medium text-foreground/80 truncate max-w-[80px]">
                        {story.user.name || story.user.username}
                    </span>
                </div>
            ))}
            
            {selectedStory && (
                <StoryModal
                    isOpen={!!selectedStory}
                    onClose={closeStoryModal}
                    story={selectedStory}
                />
            )}
        </>
    )
}

export default StoryItem