import Image from 'next/image'
import React from 'react'

import banner1 from "@/assets/images/mini-banner1.png"
import banner2 from "@/assets/images/mini-banner2.png"

export const MiniBanners = () => {
  return (
    <div className='flex justify-center gap-4 mt-10'>
        <Image className='rounded-xl' src={banner1} alt='banner 1'/>
        <Image className='rounded-xl' src={banner2} alt='banner 2'/>
    </div>
  )
}
