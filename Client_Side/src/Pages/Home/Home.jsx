import React from 'react'
import Banner from '../../Components/HomePages/Banner/Banner'
import PopularCollege from '../../Components/HomePages/PopularCollege/PopularCollege'

const Home = () => {
  return (
    <div className='space-y-9'>
      <Banner />
      <PopularCollege />
    </div>
  )
}

export default Home