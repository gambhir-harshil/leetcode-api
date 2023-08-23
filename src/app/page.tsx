import React from 'react'
import Link from 'next/link';

const home: React.FC = () => {
  return (
    <div className='h-screen'>
      <div className='flex justify-center items-center h-full'>
        <Link href='/leaderboard'>
          <button className='font-bold text-3xl border border-gray-300 p-5 rounded-xl hover:text-green-500'>Leaderboard</button>
        </Link>   
      </div>
    </div>
  )
}

export default home;