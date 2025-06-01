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
import { X, Upload, User as UserIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const UpdateUser = ({ user }: { user: User }) => {
    const [open, setOpen] = useState(false)
    const [cover, setCover] = useState<any>()

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [state, formAction] = useActionState(updateProfile, { success: false, error: false });

    return (
        <>
            <Button 
                variant='outline' 
                size="sm"
                className="h-8 px-3 text-xs font-medium border-border/70 bg-card dark:bg-card/50 rounded-xl hover:bg-accent/50"
                onClick={handleOpen}
            >
                <UserIcon className="w-3 h-3 mr-1.5" />
                Edit Profile
            </Button>
            
            {open && (
                <div className="fixed inset-0 rounded-xl bg-white/50 dark:bg-black/90 backdrop-blur-lg flex justify-center items-center z-50 p-4">
                    <Card className=" z-50 scrollbar-hide w-full border-border/70 bg-card dark:bg-card/50 rounded-xl max-w-3xl mt-10 max-h-[80vh] overflow-y-auto shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                            <CardTitle className="text-xl font-semibold">Edit Profile</CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleClose}
                                className="h-8 w-8 p-0 hover:bg-accent"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        
                        <CardContent className="space-y-6">
                            <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-md">
                                Use the navbar profile menu to change your avatar or username
                            </div>

                            <form
                                action={(formData) =>
                                    formAction({ formData, cover: cover || "" })
                                }
                                className="space-y-6"
                            >
                                {/* Cover Image Upload */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium">Cover Image</label>
                                    <CldUploadWidget
                                        uploadPreset="Bubble_social"
                                        onSuccess={(result: any) => {
                                            if (result.info && result.info.secure_url) {
                                                setCover(result.info.secure_url);
                                            }
                                        }}
                                    >
                                        {({ open }) => (
                                            <div
                                                className="relative h-32 w-full rounded-lg border-2 border-dashed border-border/50 hover:border-border cursor-pointer group overflow-hidden"
                                                onClick={() => open()}
                                            >
                                                <Image
                                                    src={cover || user.cover || '/banner.jpg'}
                                                    alt="Cover"
                                                    fill
                                                    className="object-cover rounded-xl"
                                                />
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                                                    <div className="text-white text-center">
                                                        <Upload className="w-6 h-6 mx-auto mb-2" />
                                                        <span className="text-sm font-medium">Change Cover</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </CldUploadWidget>
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">First Name</label>
                                        <Input 
                                            name='name' 
                                            type='text' 
                                            placeholder={user.name || "First name"}
                                            className="border-border/50 focus:border-ring rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                                        <Input 
                                            name='lastname' 
                                            type='text' 
                                            placeholder={user.lastname || "Last name"}
                                            className="border-border/50 focus:border-ring rounded-xl"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Website</label>
                                        <Input 
                                            name='website' 
                                            type='text' 
                                            placeholder={user.website || "your-website.com"}
                                            className="border-border/50 focus:border-ring rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">City</label>
                                        <Input 
                                            name='city' 
                                            type='text' 
                                            placeholder={user.city || "Your city"}
                                            className="border-border/50 focus:border-ring rounded-xl"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">School</label>
                                        <Input 
                                            name='school' 
                                            type='text' 
                                            placeholder={user.school || "Your school"}
                                            className="border-border/50 focus:border-ring rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Work</label>
                                        <Input 
                                            name='work' 
                                            type='text' 
                                            placeholder={user.work || "Your workplace"}
                                            className="border-border/50 focus:border-ring rounded-xl"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">About You</label>
                                    <Textarea 
                                        rows={4} 
                                        name='description' 
                                        placeholder={user.description || "Tell us about yourself..."}
                                        className="border-border/50 focus:border-ring rounded-xl resize-none"
                                    />
                                </div>

                                <div className="flex flex-col gap-3 pt-4">
                                    <UpdateButton />
                                    {state.success && (
                                        <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 p-3 rounded-md">
                                            ✓ Profile updated successfully!
                                        </div>
                                    )}
                                    {state.error && (
                                        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 p-3 rounded-md">
                                            ✗ Something went wrong. Please try again.
                                        </div>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    )
}

export default UpdateUser