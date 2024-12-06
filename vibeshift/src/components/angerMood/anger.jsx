import React from 'react'
import angerEmoji from "@/assets/images/angerEmoji.png"
import Image from 'next/image'

export default function Anger() {
  return (
    <div className="relative angerBg  w-screen h-screen">
    <Image src={angerEmoji} alt='smiley' className='h-96 w-96 absolute top-20 right-10'/>
    <div className='absolute top-5 left-10 space-y-5 flex flex-col'>
      <h1 className='text-red-500 text-5xl font-semibold font-organical '>It&apos;s Seems Like Your Are Angry</h1>
      <div className='font-mouldyCheese text-3xl '>
        <p>&quot;Anger is an acid that can do more harm to the vessel in which it is stored </p>
        <p> than to anything on which it is poured.&quot; Mark Twain.</p>
      </div>
      <audio src="/audio/angry.mp3" type="audio/mp3" autoPlay loop></audio>
    </div>
  </div>
  )
}
