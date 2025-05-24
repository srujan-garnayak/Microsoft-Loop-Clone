"use client"
import React from 'react'
import Image from 'next/image'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2Icon, SmilePlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CoverPicker from '@/app/_components/CoverPicker';
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import uuid4 from 'uuid4';

function CreateWorkspace() {

    const [coverImage, setCoverImage] = useState('/cover.png');
    const [workspaceName, setWorkspaceName] = useState('');
    const [emoji, setEmoji] = useState('');
    const { user } = useUser();
    const { orgId } = useAuth();
    const [loading, setLoading] = useState(false);
    const router = useRouter();;

    const OnCreateWorkspace = async () => {
        setLoading(true);
        const workspaceId = Date.now();

        const result = await setDoc(doc(db, 'Workspace', workspaceId.toString())
            , {
                name: workspaceName,
                coverImage: coverImage,
                emoji: emoji,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                id: workspaceId,
                orgId: orgId?.orgId ? orgId.orgId : user?.primaryEmailAddress?.emailAddress,
            });

            const docId = uuid4();
            await setDoc(doc(db, 'workspaceDocuments',docId.toString()),{
                workspaceId: workspaceId,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                id: docId,
                coverImage: null,
                emoji: null,
                documentName: 'Untitled Document',
                documentOutput: []
            })

            await setDoc(doc(db, 'documentOutput',docId.toString()),{
                docId: docId,
                Output: []
            })

        setLoading(false);
        router.replace('/workspace/'+workspaceId+'/'+docId);
    }

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
                        <EmojiPickerComponent setEmojiIcon={(v) => setEmoji(v)}>
                            <Button variant="outline">
                                {emoji ? emoji : <SmilePlus />}
                            </Button>
                        </EmojiPickerComponent>
                        <Input placeholder='Workspace Name' className='ml-2 w-full'
                            onChange={(e) => setWorkspaceName(e.target.value)}
                        />
                    </div>

                    <div className='mt-7 flex justify-end gap-4'>
                        <Button disabled={!workspaceName?.length || loading} onClick={OnCreateWorkspace} >
                            Create {loading && <Loader2Icon className='animate-spin ml-2' />}
                        </Button>
                        <Button variant="outline">
                            Cancel
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateWorkspace
