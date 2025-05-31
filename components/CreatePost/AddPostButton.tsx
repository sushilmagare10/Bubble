"use client"

import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'

const AddPostButton = () => {

    const { pending } = useFormStatus()

    return (
        <Button variant='default' size='sm' disabled={pending} className='  self-end'>
            {pending ? (
                <div className="flex items-center gap-2">
                    <div className="inline-block h-[8px] w-[10px] animate-spin rounded-full border-white-300 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                   Posting
                </div>
            ) : (
                "Post"
            )}
        </Button>
    )
}

export default AddPostButton