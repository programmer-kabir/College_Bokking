import React from 'react'
import bgVideo from '../../../assets/Banner/collegeVid.mp4'
import SearchBar from './SearchBar'
const Banner = () => {
  return (
    <header className='w-[100%] h-screen '>
    <video
      src={bgVideo}
      className='w-full h-full object-cover'
      autoPlay
      loop
      muted
    />
    <div className='absolute top-0 left-0 w-full h-full bg-gray-900/30'></div>
    <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center '>
   
    
   <SearchBar />
    </div>
  </header>
  )
}

export default Banner