import Image from 'next/image'
import React from 'react'

import bannerTopo from "@/assets/images/banner-topo.png"

export const Banner = () => {
  return (
    <div>
        <Image className='w-full m-auto' src={bannerTopo} alt='Banner site' />
    </div>
  )
}
