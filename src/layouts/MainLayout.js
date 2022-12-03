import React from 'react'
import Nav from './Nav'
import "./Layout.style.scss"
import Menu from './Menu'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
    <Nav/>
    <Menu/>
    <Outlet/>
    </>
  )
}

export default MainLayout