"use client";

import { deletePost } from "@/lib/actions/deletePost";
import { useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { Button } from "../ui/button";

const PostInfo = ({ postId }: { postId: number }) => {
    const [open, setOpen] = useState(false);

    const deletePostWithId = deletePost.bind(null, postId);
    return (
        <div className="relative">
            <MdMoreHoriz
                onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer text-2xl"
            />
            {open && (
                <div className="absolute top-4 right-0 bg-white p-4 w-32 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30">
                    <span className="cursor-pointer">View</span>
                    <span className="cursor-pointer">Re-post</span>
                    <form action={deletePostWithId}>
                        <Button variant='link' className="text-destructive p-0">Delete</Button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PostInfo;