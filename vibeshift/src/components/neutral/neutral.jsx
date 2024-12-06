import React from 'react';
import Image from 'next/image';
import neutralEmoji from '@/assets/images/neutralEmoji.png';

export default function Neutral() {
  return (
    <div className="relative neutralBg overflow-y-hidden  w-screen h-screen">
      <Image src={neutralEmoji} alt='surprised' className='h-96 w-96 absolute top-20 right-10'/>
      <div className='absolute top-5 left-10 space-y-5 flex flex-col'>
        <h1 className='text-black text-5xl font-semibold font-organical'>It&apos;s Seems Like Your Are Neutral</h1>
        <div className='font-mouldyCheese text-4xl text-slate-400'>
          <p>The darkest places in hell are reserved for those who</p>
          <p>maintain their neutrality in times of moral crisis.</p>
        </div>
      </div>
      <audio src="/audio/neutral.mp3" type="audio/mp3" autoPlay loop ></audio>
    </div>
  )
}
