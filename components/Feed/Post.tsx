import Image from 'next/image'
import React from 'react'
import PostInteraction from './PostInteraction';
import Comments from './Comments';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
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
        <Card className=' flex w-full flex-col gap-4 p-4 border dark:border-white/40 rounded-lg'>
            <CardContent className='w-full flex justify-between items-center '>
                <div className='flex justify-between items-center gap-4'>
                    <Image
                        src={post.user.avatar || "/noAvatar.png"}
                        alt='ProfilePic'
                        width={48}
                        height={48}
                        className=' rounded-full object-cover w-12 h-12 '
                    />
                    <CardTitle >
                        {post.user.name && post.user.lastname
                            ? post.user.name + " " + post.user.lastname
                            : post.user.username
                        }
                    </CardTitle>
                </div>
                {userId === post.user.id && <PostInfo postId={post.id} />}
            </CardContent>
            <CardContent className=' flex flex-col gap-4'>
                {post.img && (
                    <div className="w-full min-h-96 relative">
                        <Image
                            src={post.img}
                            fill
                            className="object-cover rounded-md"
                            alt=""
                        />
                    </div>
                )}
                <CardDescription>
                    {post.description}
                </CardDescription>
            </CardContent>
            <PostInteraction
                postId={post.id}
                likes={post.likes.map((like) => like.userId)}
                commentNumber={post._count.comments}
            />
            <Comments postId={post.id} />
        </Card>
    )
}

export default Post