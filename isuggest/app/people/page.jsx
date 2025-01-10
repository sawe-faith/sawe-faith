"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import { SiWorkplace } from "react-icons/si";


const People = () => {
  const [users, setUsers]=useState([])
  useEffect(()=>{
    fetch("http://127.0.0.1:5555/users")
    .then((response)=>{
      if(!response.ok){
        throw new Error("Error while fetching data")
      }
      return response.json()
    })
    .then((data)=>{
      console.log("availlable users.............",data)
      setUsers(data)
    })
    .catch(error=>{console.error("error while fetching users", error)})
  },[])
  return (
    <div className='flex w-full items-center flex-col  bg-gradient-to-r from-[#040313] to-[#0c093d] h-screen text-white'>
       <div className='flex w-full items-center justify-between mt-5'>
       <Link href="/"><div className='flex items-center ml-[60px]'><SiWorkplace className='text-orange-500'/><p className='italic'>vacan</p><span className='text-lg '>C</span></div></Link> 
        <div className='mr-[450px]'><Navbar /></div>
        </div>

    </div>
  )
}

export default People