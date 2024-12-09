import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import {Outlet} from 'react-router-dom'
import Footer from '../Shared/Footer/Footer'
import useAuth from '../Components/Hooks/useAuth'
import Loading from '../Pages/Loading/Loading'
const MainLayout = () => {
  const {user,loading} = useAuth()
  if(loading){
    return <Loading />
  }
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