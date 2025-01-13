"use client"
import React, { useEffect, useState } from 'react'
import { SiWorkplace } from "react-icons/si";
import Link from 'next/link.js';
import { FaChevronDown } from "react-icons/fa";


const Page = () => {
  const [user, setUser] = useState(null)
  const id = sessionStorage.getItem("id")

  useEffect(() => {
    if (id) { // Make sure there's an id before fetching
      fetch(`http://127.0.0.1:5555/user/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error while getting user")
          }
          return res.json()
        })
        .then((data) => {
          setUser(data)
          console.log("home data.....", data)
        })
        .catch(error => { console.error("Error!", error) })
    }
  }, [id]) // Add id to dependency array to avoid stale references

  return (
    <div className='flex w-full items-center flex-col bg-gradient-to-r from-[#040313] to-[#0c093d] text-white'>
      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center ml-[60px]'><SiWorkplace className='text-orange-500' /><p className='italic'>vacan</p><span className='text-lg '>C</span></div>

        <div className='flex items-center justify-center mt-6 mr-[60px]'>
          {user ? (
            user.user_type === "admin" ? (
              <Link href="/user">
                <img className='w-[40px] hover:cursor-pointer border rounded-full border-[#4fb877] h-auto' src='/usericon.png' alt='user profile' />
              </Link>
            ) : (
              <Link href="/userprofile">
                <img className='w-[40px] hover:cursor-pointer border rounded-full border-[#4fb877] h-auto' src='/usericon.png' alt='user profile' />
              </Link>
            )
          ) : (
            <Link href="/login">
              <button className='w-[80px] items-center text-sm italic p-1 rounded-md hover:bg-gradient-to-r hover:from-[#ffa2f4] hover:to-[#b848ab] hover:text-white hover:border-none border border-white'>Login</button>
            </Link>
          )}
        </div>
      </div>

      <div className='grid text-white grid-cols-2 items-center mt-5 w-full'>
        <div className='flex flex-col w-full items-center h-full'>
          <div className='flex ml-[200px] mt-12 flex-col justify-start w-full items-center'>
            <h1 className='flex text-5xl w-full items-center'>Finding The</h1>
            <h1 className='flex text-5xl w-full items-center text-[#ffa2f4]'>Job Beyond</h1>
            <h1 className='flex text-5xl w-full items-center'>Borders</h1>
          </div>
          <div className='flex w-full items-center text-sm ml-[200px] mt-4 flex-col'>
            <p className='flex w-full justify-start text-[13px]'>Discover the job you love, research on your favorite company</p>
            <p className='flex w-full justify-start text-[13px]'>And kickstart your dream job</p>
          </div>
          <div className='flex rounded-md ml-[200px] w-full mt-9'>
            <form className='w-[400px] flex items-center justify-between rounded-md text-black bg-gray-200 h-[50px]'>
              <input type='text' placeholder='Search....' className='text-[12px] bg-inherit rounded-lg outline-none text-black p-3' />
              <h1 className='text-[12px] cursor-pointer flex items-center'>Location <FaChevronDown className='ml-3' /></h1>
              <button className='p-2 h-full bg-gradient-to-r from-[#ffa2f4] to-[#b848ab] flex items-center justify-center rounded-r-md w-[90px] text-[12px]'>Search Now</button>
            </form>
          </div>
        </div>
        <div style={{ backgroundImage: "url('/bg.png')" }} className='flex bg-cover items-center justify-center'>
          <img src='/man.png ' className='w-full h-auto' alt='homepage photo' />
        </div>
      </div>
    </div>
  )
}

export default Page
