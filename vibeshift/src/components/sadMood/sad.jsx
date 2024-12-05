import Image from 'next/image'
import React from 'react'
import sadEmoji from "@/assets/images/sadEmoji.png"

export default function Sad() {
  return (
    <div className="relative sadBg  w-screen h-screen">
      <Image src={sadEmoji} alt='smiley' className='h-96 w-96 absolute top-20 right-10'/>
      <div className='absolute top-5 left-10 space-y-5 flex flex-col'>
        <h1 className='text-black text-5xl font-semibold font-organical'>It&apos;s Seems Like Your Are Sad</h1>
        <div className='font-mouldyCheese text-2xl '>
          <p>There are moments when I wish I could roll back the clock and take all the sadness</p>
          <p> away, but I have the feeling that if I did, the joy would be gone as well.</p>
        </div>
      </div>
    </div>
  )
}
