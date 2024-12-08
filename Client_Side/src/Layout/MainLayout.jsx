import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import {Outlet} from 'react-router-dom'
import Footer from '../Shared/Footer/Footer'
const MainLayout = () => {
  return (
    <div>
      <Navbar />
     <div>
     <Outlet />
     </div>
      <Footer />
    </div>
  )
}

export default MainLayout