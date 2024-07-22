import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'

const NoPosts = () => {
    return (
        <Card className='flex flex-col dark:border-white/40 shadow-lg justify-center items-center h-[410px]'>
            <CardContent className=' flex flex-col justify-center items-center gap-4'>
                <CardTitle className='text-2xl'>
                    No Post Yet.😢
                </CardTitle>
                <CardDescription className='text-lg'>
                    Add new Friends to see their Posts....!
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default NoPosts