"use client";

import { deletePost } from "@/lib/actions/deletePost";
import { useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const PostInfo = ({ postId }: { postId: number }) => {
    const [open, setOpen] = useState(false);
    const deletePostWithId = deletePost.bind(null, postId);

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setOpen((prev) => !prev)}
            >
                <MdMoreHoriz className="w-5 h-5 text-muted-foreground" />
            </Button>
            
            {open && (
                <Card className="absolute top-full right-0 mt-1 p-2 w-32 shadow-lg z-30 ">
                    <div className="flex flex-col gap-1">
                        <Button variant="ghost" size="sm" className="justify-start text-xs h-8">
                            View
                        </Button>
                        <Button variant="ghost" size="sm" className="justify-start text-xs h-8">
                            Re-post
                        </Button>
                        <form action={deletePostWithId}>
                            <Button 
                                variant="secondary" 
                                size="sm" 
                                className="justify-start text-red-400 text-xs h-8  w-full"
                            >
                                Delete
                            </Button>
                        </form>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default PostInfo;