import React from 'react'
import smiley from "@/assets/images/smiley.png";
import Image from 'next/image';

export default function Happy() {
  return (
    <div className="relative happyBg  w-screen h-screen">
      <Image src={smiley} alt='smiley' className='h-full w-96 absolute right-10'/>
      <div className='absolute top-5 left-10 space-y-5 flex flex-col'>
        <h1 className='text-black text-5xl font-semibold font-organical'>It&apos;s Seems Like Your Are Happy</h1>
        <div className='font-mouldyCheese text-3xl '>
          <p>Smile in the mirror. Do that every morning and you&apos;ll</p>
          <p>start to see a big difference in your life.</p>
        </div>
      </div>
    </div>
  )
}
