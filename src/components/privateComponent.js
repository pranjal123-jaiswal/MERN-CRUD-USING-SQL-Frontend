import React from 'react'
import { useNavigate , Outlet } from 'react-router-dom'

const PrivateComponent = () => {
    const navigate = useNavigate()
    const auth = localStorage.getItem('user');
    
  return (
    auth ? <Outlet/> : navigate("/signup")
  )
}

export default PrivateComponent