"use client"


import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom';

const UpdateButton = () => {

    const { pending } = useFormStatus();

    return (
        <Button className='mt-2' disabled={pending}>
            {pending ? "Updating..." : "Update"}
        </Button>
    )
}

export default UpdateButton