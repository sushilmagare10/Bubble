import prisma from '@/lib/client';
import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card';
import { ImageIcon } from 'lucide-react';

const UserMediaCard = async ({ user }: { user: User }) => {
    const postsWithMedia = await prisma.post.findMany({
        where: {
            userId: user.id,
            img: { not: null },
        },
        take: 8,
        orderBy: { createdAt: "desc" },
    });

    return (
        <Card className="border-border/70 bg-card/50 rounded-xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-medium text-sm">Photos</h3>
                </div>
                <button className="text-xs text-primary hover:text-primary/80 font-medium">
                    See All
                </button>
            </CardHeader>
            
            <CardContent>
                {postsWithMedia.length > 0 ? (
                    <div className="grid grid-cols-4 gap-2">
                        {postsWithMedia.map((post) => (
                            <div key={post.id} className="relative aspect-square group cursor-pointer">
                                <Image
                                    src={post.img!}
                                    alt=""
                                    fill
                                    className="object-cover rounded-xl group-hover:opacity-80 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-md transition-colors" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <ImageIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">No photos yet</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default UserMediaCard