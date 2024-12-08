import React from 'react'
import Banner from '../../Components/HomePages/Banner/Banner'
import PopularCollege from '../../Components/HomePages/PopularCollege/PopularCollege'
import CollegeGallery from '../../Components/HomePages/CollegeGallery/CollegeGallery'

const Home = () => {
  return (
    <div className='space-y-9'>
      <Banner />
      <PopularCollege />
      <CollegeGallery />
    </div>
  )
}

export default Home