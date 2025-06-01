import Image from 'next/image'
import React from 'react'
import PostInteraction from './PostInteraction';
import Comments from './Comments';
import { Card, CardContent } from '../ui/card';
import { Post as PostType, User } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import PostInfo from './PostInfo';

type FeedPostType = PostType & { user: User } & {
    likes: [{ userId: string }];
} & {
    _count: { comments: number };
};

const Post = ({ post }: { post: FeedPostType }) => {
    const { userId } = auth();
    
    return (
        <Card className="border-border/70 bg-card/50 rounded-xl shadow-sm overflow-hidden">
            {/* Post Header */}
            <CardContent className="p-6 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src={post.user.avatar || "/noAvatar.png"}
                            alt="User avatar"
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="font-medium text-foreground">
                                {post.user.name && post.user.lastname
                                    ? `${post.user.name} ${post.user.lastname}`
                                    : post.user.username
                                }
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    {userId === post.user.id && <PostInfo postId={post.id} />}
                </div>
            </CardContent>

            {/* Post Content */}
            <CardContent className="px-6 pb-4 space-y-4">
                {post.description && (
                    <p className="text-foreground leading-relaxed">
                        {post.description}
                    </p>
                )}
                
                {post.img && (
                    <div className="w-full aspect-video relative overflow-hidden rounded-xl bg-muted">
                        <Image
                            src={post.img}
                            fill
                            className="object-cover"
                            alt="Post image"
                        />
                    </div>
                )}
            </CardContent>

            {/* Post Interactions */}
            <PostInteraction
                postId={post.id}
                likes={post.likes.map((like) => like.userId)}
                commentNumber={post._count.comments}
            />

            {/* Comments */}
            <Comments postId={post.id} />
        </Card>
    )
}

export default Post