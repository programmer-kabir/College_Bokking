import { useContext } from 'react'

import { Navigate, useLocation } from 'react-router'
import useAuth from '../Components/Hooks/useAuth'
import Loading from '../Pages/Loading/Loading'


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <Loading />
  }

  if (user) {
    return children
  }
  return <Navigate to='/signIn' state={{ from: location }} replace></Navigate>
}

export default PrivateRoute