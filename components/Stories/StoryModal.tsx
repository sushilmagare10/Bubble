"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Story, User } from '@prisma/client';
import { Button } from '../ui/button';


type StoryWithUser = Story & {
    user: User;
};

type StoryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    story: StoryWithUser;
}

const StoryModal = ({ isOpen, onClose, story }: StoryModalProps) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                onClose();
            }, 10000); // 20 seconds

            return () => {
                clearTimeout(timer);
                setIsAnimating(false);
            };
        }
    }, [isOpen, onClose]);

    return (
        <div className="fixed inset-0 z-50 bg-black/65 flex flex-col items-center justify-center rounded-xl">
            <div className="w-full h-full max-w-3xl  bg-black flex flex-col rounded-xl m-4">
                <div className="w-full h-1  bg-gray-700 mb-3 sm:mb-4">
                    <div
                        className={`h-full  w-full bg-primary ${isAnimating ? 'animate-progress' : ''}`}
                        style={{ animationDuration: '10s' }}
                    />
                </div>
                <div className="relative flex-grow flex items-center justify-center">
                    <Image
                        src={story.img}
                        alt={story.user.username}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-lg"
                    />
                    <Button
                        onClick={onClose}
                        className="absolute top-3 rounded-full right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 z-10"
                    >
                        X
                    </Button>
                    <div className="absolute top-5 left-2 sm:bottom-4 sm:left-4 text-white z-10">
                        <h3 className="font-semibold text-base sm:text-lg">{story.user.name || story.user.username}</h3>
                        <p className="text-xs sm:text-sm opacity-75">
                            {new Date(story.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryModal;