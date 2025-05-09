"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { AlignLeft, LayoutGrid } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CreateWorkspace from '../../createworkspace/page';

function WorkspaceList() {
    const { user } = useUser();

    const [WorkspaceList, setWorkspaceList] = useState([]);
    return (
        <div className='my-6 p-10 md:px-24 lg:px-36 xl:px-52'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold'>Hello, {user?.fullName}</h1>
                    <p className='text-gray-500'>Select a workspace to view its details.</p>
                </div>
                <Link href={'./createworkspace'}>
                    <Button className='text-lg' variant=''>+</Button>
                </Link>

            </div>

            <div className='mt-4 flex justify-between'>
                <div>
                    <h2 className='text-primary font-medium'>Workspaces</h2>
                </div>
                <div className='flex gap-2'>
                    <LayoutGrid />
                    <AlignLeft />
                </div>
            </div>

            {WorkspaceList?.length === 0 ? (
                <div className='flex flex-col items-center justify-center my-8'>
                    <Image src="/workspace.png" alt="Workspaces" width={200} height={200} />
                    <h2>Create a new workspace</h2>
                    <Link href={'./createworkspace'}>
                        <Button variant={'outline'} className='mt-4 border-black'>+ New Workspace</Button>
                    </Link>

                </div>
            ) : (
                <div>
                    Workplace List
                </div>
            )}
        </div>
    )
}

export default WorkspaceList
