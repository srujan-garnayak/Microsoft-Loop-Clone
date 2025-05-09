"use client"
import React from 'react'
import Image from 'next/image'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SmilePlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CoverPicker from '@/app/_components/CoverPicker';
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent';

function CreateWorkspace() {

    const [coverImage, setCoverImage] = useState('/cover.png');
    const [workspaceName, setWorkspaceName] = useState('');
    const [emoji, setEmoji] = useState('');

    return (



        <div className='p-10 md:px-36 lg:px-64 xl:px-96 py-28'>
            <div className='bg-white shadow-2xl rounded-2xl'>

                {/* Cover Image */}
                <CoverPicker setNewCover={(v) => setCoverImage(v)}>
                    <div className='relative group cursor-pointer'>
                        <h2 className='hidden absolute p-4 w-full h-full items-center group-hover:flex justify-center font-bold'>Change Cover</h2>
                        <div className='group-hover:opacity-40'>
                            <Image src={coverImage} alt='coverimage' width={400} height={400} className='w-full h-[150px] object-cover rounded-t-xl' />
                        </div>
                    </div>
                </CoverPicker>

                {/* Input Section */}

                <div className='p-8'>
                    <h2 className='text-xl font-bold'>Create a new workspace</h2>
                    <h2 className='text-sm mt-2'>This is a shared space where you can collaborate wth your team.
                        You can always rename it later.
                    </h2>

                    <div className='mt-4 flex items-center justify-between'>
                        <EmojiPickerComponent setEmojiIcon={(v)=> setEmoji(v)}>
                            <Button variant="outline">
                                {emoji?emoji : <SmilePlus />}
                            </Button>
                        </EmojiPickerComponent>
                        <Input placeholder='Workspace Name' className='ml-2 w-full'
                            onChange={(e) => setWorkspaceName(e.target.value)}
                        />
                    </div>

                    <div className='mt-7 flex justify-end gap-4'>
                        <Button disabled={!workspaceName?.length} >Create</Button>
                        <Button variant="outline">Cancel</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateWorkspace
