"use client"

import { User } from '@prisma/client'
import React, { useActionState, useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { updateProfile } from '@/lib/actions/updateProfile'
import { CldUploadWidget } from 'next-cloudinary';
import UpdateButton from './UpdateButton'


const UpdateUser = ({ user }: { user: User }) => {

    const [open, setOpen] = useState(false)
    const [cover, setCover] = useState<any>()

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [state, formAction] = useActionState(updateProfile, { success: false, error: false });


    return (
        <>
            <Button variant='outline' className="px-3 py-1 h-max text-xs w-max -mt-2" onClick={handleOpen}>
                Update Profile
            </Button>
            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center z-50 transition-all ease-in duration-500">
                    <div className="bg-card shadow-xl rounded-lg flex flex-col p-6 m-4 max-w-xl w-full border border-white/30">
                        <Button variant='outline' onClick={handleClose} className=" z-20 h-0 w-0 p-4 dark:text-white bg-transparent rounded-full self-end">
                            X
                        </Button>
                        <form
                            action={(formData) =>
                                formAction({ formData, cover: cover || "" })
                            }
                            className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold mb-4 -mt-7">Update Profile</h2>
                            {/* Add your form fields here */}
                            <div className='text-xs text-gray-500'>
                                Use the Navbar profile to change the avatar or username
                            </div>
                            <div className=' flex flex-col justify-center gap-4'>
                                <CldUploadWidget
                                    uploadPreset="Bubble_social"
                                    onSuccess={(result: any) => {
                                        if (result.info && result.info.secure_url) {
                                            setCover(result.info.secure_url);
                                        }
                                    }}
                                >
                                    {({ open }) => {
                                        return (
                                            <>
                                                <label htmlFor=''>Cover Image</label>
                                                <div
                                                    className=' relative h-[150px] w-full  flex items-center gap-2 mt-2 mb-4 cursor-pointer'
                                                    onClick={() => open()}>
                                                    <Image
                                                        src={user.cover || '/banner.jpg'}
                                                        alt={user.username}
                                                        fill
                                                        className='w-12 h-8 rounded-lg object-cover'
                                                    />
                                                    <span className=' absolute -bottom-5 text-xs font-medium underline-offset-1 underline text-gray-600'>Change</span>
                                                </div>
                                            </>
                                        );
                                    }}
                                </CldUploadWidget>

                                <div className='flex flex-wrap justify-between gap-2 xl:gap-4'>
                                    <div className=' flex flex-col gap-2'>
                                        <label htmlFor='' className='text-xs text-gray-600'>
                                            First Name
                                        </label>
                                        <Input name='name' type='text' placeholder={user.name || "John"} />
                                    </div>
                                    <div className=' flex flex-col gap-2'>
                                        <label htmlFor='' className='text-xs text-gray-500'>
                                            Last Name
                                        </label>
                                        <Input name='lastname' type='text' placeholder={user.lastname || "John"} />
                                    </div>
                                </div>
                                <div className='flex flex-wrap justify-between gap-2 xl:gap-4'>
                                    <div className=' flex flex-col gap-2'>
                                        <label htmlFor='' className='text-xs text-gray-500'>
                                            Website
                                        </label>
                                        <Input name='website' type='text' placeholder={user.website || "your@website.com"} />
                                    </div>
                                    <div className=' flex flex-col gap-2'>
                                        <label htmlFor='' className='text-xs text-gray-500'>
                                            City
                                        </label>
                                        <Input name='city' type='text' placeholder={user.city || "Mumbai"} />
                                    </div>
                                </div>
                                <div className='flex flex-wrap justify-between gap-2 xl:gap-4'>
                                    <div className=' flex flex-col gap-2'>
                                        <label htmlFor='' className='text-xs text-gray-500'>
                                            School
                                        </label>
                                        <Input name='school' type='text' placeholder={user.school || "IIT"} />
                                    </div>
                                    <div className=' flex flex-col gap-2'>
                                        <label htmlFor='' className='text-xs text-gray-500'>
                                            Work
                                        </label>
                                        <Input name='work' type='text' placeholder={user.work || "Apple"} />
                                    </div>
                                </div>
                                <div className='flex flex-wrap justify-between gap-2 xl:gap-4'>
                                    <div className=' flex flex-col gap-2'>
                                        <label htmlFor='' className='text-xs text-gray-500'>
                                            Description                                        </label>
                                        <Textarea rows={5} cols={70} name='description' placeholder={user.description || "Your Description"} />
                                    </div>
                                </div>
                                <UpdateButton />
                                {state.success && (
                                    <span className="text-green-500">Profile has been updated!</span>
                                )}
                                {state.error && (
                                    <span className="text-red-500">Something went wrong!</span>
                                )}
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </>
    )
}

export default UpdateUser