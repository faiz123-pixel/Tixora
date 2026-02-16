import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <Navbar/>
    <main style={{marginTop:"60px"}}>
      <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default Layout