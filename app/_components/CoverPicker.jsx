import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import CoverOption from '../_shared/CoverOption'
import Image from 'next/image'
import { DialogClose } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react';


function CoverPicker({ children, setNewCover }) {

    const [selectedCover, setSelectedCover] = useState();

    return (
        <Dialog>
            <DialogTrigger className="w-full">
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Cover</DialogTitle>
                    <DialogDescription>
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4'>
                            {/* Map through the CoverOption array and display each image */}
                            {CoverOption.map((cover, index) => (
                                <div onClick={() => setSelectedCover(cover?.imageUrl)}  className={`${selectedCover == cover?.imageUrl 
                                && 'border-2 border-purple-600'} p-1 rounded-lg`}>
                                    <Image src={cover.imageUrl} width={200} height={140}
                                        className='h-[70px] w-full object-cover rounded-lg' />

                                </div>
                            ))}
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" onClick={() => setNewCover(selectedCover)}>
                            Update
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CoverPicker
