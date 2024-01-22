import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import {Outlet} from 'react-router-dom'
import '../layout/layout.css'

const Layout = () => {
  return (
    <>
        <div className='layoutContainer'>
        <div className='container'>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </div>
        </div>
    </>
  )
}

export default Layout