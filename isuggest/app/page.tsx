import React from 'react'
import Navbar from './components/Navbar.jsx'
import { SiWorkplace } from "react-icons/si";
import Link from 'next/link.js';


const page = () => {
  return (
    <div className='flex w-full items-center flex-col mt-5 bg-gradient-to-r from-[#040313] to-[#0c093d] h-screen text-white'>
      <div className='flex w-full items-center justify-between'>
      <div className='flex items-center ml-[60px]'><SiWorkplace className='text-orange-500'/><p className='italic'>vacan</p><span className='text-lg '>C</span></div>
    <div className='flex mt-6'>
      <Navbar />
      </div>
      <div className='flex items-center mr-[60px]'>
       <Link href="/login"> <button className='w-[80px] items-center text-sm italic p-1 rounded-lg hover:bg-orange-500 hover:text-white hover:border-none  border border-white'>Login</button></Link>
      </div>
      </div>
    </div>
  )
}

export default page