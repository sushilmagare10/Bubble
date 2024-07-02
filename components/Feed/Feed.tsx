import React from 'react'
import Post from './Post'

const Feed = () => {
    return (
        <div className='p-4 bg-white shadow-xl rounded-lg flex flex-col border gap-12'>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export default Feed