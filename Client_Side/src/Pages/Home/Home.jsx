import React from 'react'
import Banner from '../../Components/HomePages/Banner/Banner'
import PopularCollege from '../../Components/HomePages/PopularCollege/PopularCollege'
import CollegeGallery from '../../Components/HomePages/CollegeGallery/CollegeGallery'
import Reviews from '../../Components/HomePages/Reviews/Reviews'

const Home = () => {
  return (
    <div className='space-y-9'>
      <Banner />
      <PopularCollege />
      <CollegeGallery />
      <Reviews />
    </div>
  )
}

export default Home