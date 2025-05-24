"use client"
import { useEffect, useState } from 'react';
import Logo from '@/app/_components/Logo'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import React from 'react'
import { query } from 'firebase/firestore';
import { collection, onSnapshot, where } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

function SideNav({params}) {

  const [documentList, setDocumentList] = useState([]);

  useEffect(() => {
    params && GetDocumentList();
  }, [params]);


    const GetDocumentList =() =>{
        const q=query(collection(db, 'workspaceDocuments'),
         where('workspaceId', '==',Number(params?.workspaceid)));

        const unSubscribe = onSnapshot(q, (querySnapshot) => {
            
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                setDocumentList(documentList => [...documentList, doc.data()]);
            });
            
        });
    }

  return (
    <div className='md:w-72 hidden h-screen md:block fixed bg-blue-50'>
      <div className='flex justify-between items-center p-5'>
        <Logo />
        <Bell className='cursor-pointer text-gray-500'/>
      </div>

      <hr className=''></hr>

      <div className='flex justify-between items-center p-4'>
        <div className='font-bold'> 
            Workspace Name
        </div>
        <Button size="sm">+</Button>
      </div>

    </div>
  )
}

export default SideNav
