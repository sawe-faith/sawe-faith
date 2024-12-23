"use client"
import React, { useState } from 'react'
import Navbar from "../components/Navbar.jsx"
import Link from 'next/link.js'



const Login = () => {
    const [data, setData]=useState("")
  return (
    <div  className='flex w-full items-center flex-col  bg-gradient-to-r from-[#040313] to-[#0c093d] h-full text-white'>
        <div className='flex w-full items-center justify-center mt-5'>
        <Navbar />
        </div>
        <div className='grid mt-8 grid-cols-2 w-full items-center'>
            <div className='flex items-center justify-center h-full'>
                <img className='flex w-[400px] h-auto' src='/loginImage.png' alt="image for the login page"/>
            </div>
            <div className='flex flex-col h-full w-[600px] shadow-lg bg-gradient-to-l from-[#040313] to-[#0c093d] rounded-lg items-center'>
                <h1 className='mt-[40px] text-[30px]'>Hello. Kindly Sign in</h1>
                <p className='text-sm mt-2'>Do not have an account? <Link className='text-gray-300 italic' href="/signup">Sign up!</Link></p>
                <form className='mt-5 gap-5 flex flex-col '>
                    <input className='flex w-[500px] bg-inherit text-sm outline-none bg-gray-500 rounded-md p-2' type='text' placeholder='Enter your email'/>
                    <input className='flex w-[500px] bg-inherit text-sm outline-none bg-gray-500 rounded-md p-2' type='password' placeholder='Enter your password'/>
                    <button className='flex w-[500px] bg-inherit text-sm  bg-[#3e1c8e] items-center justify-center rounded-md p-2'>Sign in</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login