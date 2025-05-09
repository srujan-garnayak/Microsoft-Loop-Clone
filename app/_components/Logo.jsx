import React from 'react'
import Image from 'next/image';

function Logo() {
  return (
    <div className='flex items-center gap-2'>
      {/* Logo Image */}
      <Image src="/logo.png" alt="Logo" width={30} height={30} />
      <h2 className='text-xl font-bold'>Loop</h2>
    </div>
  )
}

export default Logo
