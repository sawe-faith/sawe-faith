"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SiWorkplace } from "react-icons/si";
import Navbar from '../components/Navbar';
import { Router } from 'next/dist/client/router';
import { useRouter } from 'next/navigation';


const page = () => {
  const router=useRouter()
  const id=sessionStorage.getItem("id")
  const [user, setUser]=useState(null)
  const [userData, setuserData]=useState({
    username:"",
    email:"",
    password:""
  })

  const handleInputChange =(e)=>{
    const {name, value}=e.target
    setuserData ({...userData, [name]:value})
  }

  useEffect(()=>{
    fetch(`http://127.0.0.1:5555/user/${id}`)
    .then((response)=>{
      if(!response.ok){
        throw new Error("Error while collecting user")
      }
      return response.json()
    })
    .then((data)=>{
      console.log("profile user data..................", data)
      setUser(data)
    })
    .catch(error=>{console.error("failed fetching user profile!"), error})
  },[id])

  const handleLogOut=()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("id")
    alert("successfully logged out!")
    router.push("/login")
  }
  return (
    <div  className='flex w-full items-center flex-col  bg-gradient-to-r from-[#040313] to-[#0c093d] text-white'>
    <div className='flex w-full items-center justify-between mt-5'>
  <Link href="/"><div className='flex items-center ml-[60px]'><SiWorkplace className='text-orange-500'/><p className='italic'>vacan</p><span className='text-lg '>C</span></div></Link> 
   <div className='mr-[450px]'><Navbar /></div>
   </div>

   <div className='grid grid-cols-4 w-full h-screen  gap-5 mt-[15px]  items-center '>
    <div className='flex flex-col w-full col-span-1 h-full gap-7 ml-[30px]   items-center   bg-gradient-to-r from-[#040313] to-[#0c093d]  text-white'>
    <img src='/usericon.png' alt='user icon' className='w-[120px] mt-9 border rounded-full border-[#4fb877]  h-auto'/>
    <button className='flex w-[200px] mt-4 p-2 items-center justify-center rounded-sm bg-[#431f97] text-[12px] hover:bg-orange-400'>Update profile picture</button>
    <button className='flex w-[200px] p-2 items-center justify-center rounded-sm bg-[#431f97] text-[12px] hover:bg-red-500'>Remove profile picture</button>
    <button onClick={handleLogOut} className='flex w-[200px] p-2 items-center justify-center rounded-sm bg-orange-400 hover:bg-red-600 text-[12px]'>Sign out</button>
    </div>
  
   <div className='flex flex-col ml-[30px] h-screen  bg-gradient-to-r from-[#040313] to-[#0c093d]  text-white col-span-2 w-full items-center'>
    {user &&(<form className='flex gap-3 mt-11 flex-col justify-start w-full items-center'>
      <div className='flex w-full flex-col items-center  justify-start '>
        <p className='ml-[10px] mb-2 flex w-[400px] text-[12px]  '>My profile username</p>
        <input type='text' onChange={handleInputChange} name='username' value={userData.username} placeholder={user.username} className='flex text-[10px] text-black w-[400px] ml-[2px] p-2 rounded-sm outline-none mr-[0px]'/>
      </div>
      <div className='flex w-full flex-col items-center  justify-start '>
        <p className='ml-[10px] mb-2 flex w-[400px] text-[12px] '>Login Email</p>
        <input type='text' onChange={handleInputChange} name='email' value={userData.email} placeholder={user.email} className='flex text-[10px] text-black w-[400px] ml-[2px] p-2 rounded-sm outline-none mr-[0px]'/>
      </div>
      <div className='flex w-full flex-col items-center  justify-start'>
        <p className='ml-[10px] mb-2 flex w-[400px] text-[12px] '>Where I come from</p>
        <input type='text' onChange={handleInputChange} name='location' value={userData.location} placeholder={user.location} className='flex text-[10px] text-black w-[400px] ml-[2px] p-2 rounded-sm outline-none mr-[0px]'/>
      </div>
      <div className='flex w-full flex-col items-center  justify-start'>
        <p className='ml-[10px] mb-2 flex w-[400px] text-[12px]  '>About me</p>
        <textarea type='text' onChange={handleInputChange} name='about' value={userData.about} placeholder={user.about} className='flex text-[10px] text-black w-[400px] ml-[2px] p-2 rounded-sm outline-none mr-[0px]'/>
      </div>
      <div className='flex w-full flex-col items-center  justify-start'>
        <p className='ml-[10px] mb-2 flex w-[400px] text-[12px]  '>My role</p>
        <input type='text' onChange={handleInputChange} name='user_role' value={userData.user_role} placeholder={user.user_role} className='flex text-[10px] text-black w-[400px] ml-[2px] p-2 rounded-sm outline-none mr-[0px]'/>
      </div>
      <div className='flex w-full flex-col items-center  justify-start'>
        <button className='flex p-2 w-[400px] mt-4 hover:bg-orange-400 bg-[#4821a5] rounded-sm text-[12px] hover:text-[#040313] hover:font-bold items-center justify-center'>Save changes</button>
      </div>
    </form>)}
   </div>
   </div>
</div>
  )
}

export default page