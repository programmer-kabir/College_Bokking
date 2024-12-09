import React from 'react'
import Banner from '../../Components/HomePages/Banner/Banner'
import PopularCollege from '../../Components/HomePages/PopularCollege/PopularCollege'
import CollegeGallery from '../../Components/HomePages/CollegeGallery/CollegeGallery'
import Reviews from '../../Components/HomePages/Reviews/Reviews'
import ResearchPapersSection from '../../Components/HomePages/ResearchPaper/ResearchPaper'

const Home = () => {
  return (
    <div className='space-y-9'>
      <Banner />
      <PopularCollege />
      <CollegeGallery />
      <ResearchPapersSection />
      <Reviews />
    </div>
  )
}

export default Home