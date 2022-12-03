import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


function ProtectedRout({children}) {
    const {userName}=useSelector(state=>state.movie)
  return userName ? children : <Navigate to="/error"/>
}

export default ProtectedRout