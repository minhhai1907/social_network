import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'
import useAuth from '../hooks/useAuth'

function AuthRequire({children}) {
    const location=useLocation()
    const {isInitialized,isAuthenticated}=useAuth()
    if(!isInitialized) return <LoadingScreen/>
    if(!isAuthenticated) return <Navigate to="/login" state={{from:location}} replace/>
  return children
}

export default AuthRequire
