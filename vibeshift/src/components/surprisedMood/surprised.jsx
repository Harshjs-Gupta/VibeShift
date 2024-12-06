import Image from 'next/image'
import React from 'react'
import surprisedEmoji from "@/assets/images/surprisedEmoji.png"


export default function Surprised() {
  return (
    <div className="relative surprisedBg  w-screen h-screen">
      <Image src={surprisedEmoji} alt='surprised' className='h-96 w-96 absolute top-20 right-10'/>
      <div className='absolute top-5 left-10 space-y-5 flex flex-col'>
        <h1 className='text-black text-5xl font-semibold font-organical'>It&apos;s Seems Like Your Are Surprised</h1>
        <div className='font-mouldyCheese text-4xl '>
          <p>&quot;This is not what I expected.&quot;</p>
          
        </div>
      </div>
      <audio src="/audio/surprised.mp3" type="audio/mp3" autoPlay loop></audio>
    </div>
  )
}
