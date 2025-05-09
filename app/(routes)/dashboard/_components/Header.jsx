"use client"
import { usePathname } from 'next/navigation'   
import Logo from '@/app/_components/Logo'
import { useAuth } from '@clerk/clerk-react'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
    const {orgId} = useAuth();
    console.log(orgId)
    return (
        <div className='flex items-center justify-between p-4 bg-white shadow-md'>
            <Logo />
            <OrganizationSwitcher
            afterLeaveOrganizationUrl={'/dashboard'}
            afterCreateOrganizationUrl={'/dashboard'}
            />
            <UserButton />
        </div>
    )
}

export default Header
