"use client"

import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'

const AddPostButton = () => {
    const { pending } = useFormStatus()

    return (
        <Button 
            variant="default" 
            size="sm" 
            disabled={pending} 
            className="px-6 font-medium"
        >
            {pending ? (
                <div className="flex items-center gap-2">
                    <div className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-e-transparent" />
                    Posting...
                </div>
            ) : (
                "Post"
            )}
        </Button>
    )
}

export default AddPostButton