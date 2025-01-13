"use client"
import React, { useState } from 'react'
import Navbar from "../components/Navbar.jsx"
import Link from 'next/link.js'
import { MdRouter } from 'react-icons/md'
import {useRouter} from"next/navigation"
import { SiWorkplace } from "react-icons/si";



const Login = () => {
    const router=useRouter()
    const [data, setData]=useState({
         
        username:"",
        email:"",
        password:"",
        user_type:""
    }
    )
    const handleInput=(e)=>{
        const {name, value}=e.target
        setData({...data, [name]:value})
    }

   const handleSubmit =(e)=>{
    e.preventDefault()
    fetch("http://127.0.0.1:5555/user/login",{
        method:"POST",
        headers:{"Content-type":"application/json",},
        body:JSON.stringify(data)
    })
    .then((response)=>{
        if(!response.ok){
            throw new Error("Failed to log in")
        }
        return response.json()
    })
    .then((data)=>{
        console.log("login data.............", data)
        alert("Sucessfully logged in!")
        sessionStorage.setItem("id", data.id)
        sessionStorage.setItem("token", data.token)
       

        
    })
    .catch(error=>{console.error("Failed to log in due to an unexpected error", error)})
    if(data.user_type === "admin"){
        router.push("/jobs")
    }
    else {
        router.push("/userjobs")
    }
    
   }
   
  

  return (
    <div  className='flex w-full items-center flex-col  bg-gradient-to-r from-[#040313] to-[#0c093d] h-full text-white'>
        <div className='flex w-full items-center justify-between mt-5'>
       <Link href="/"><div className='flex items-center ml-[60px]'><SiWorkplace className='text-orange-500'/><p className='italic'>vacan</p><span className='text-lg '>C</span></div></Link> 
        <div className='mr-[450px]'><Navbar /></div>
        
        </div>
        <div className='grid mt-8 grid-cols-2 w-full items-center'>
            <div className='flex items-center justify-center h-full'>
                <img className='flex w-[400px] h-auto' src='/loginImage.png' alt="image for the login page"/>
            </div>
            <div className='flex flex-col h-full w-[400px] ml-[150px] shadow-lg bg-gradient-to-l from-[#040313] to-[#0c093d] rounded-lg items-center'>
                <h1 className='mt-[40px] text-[30px]'>Hello. Kindly Sign in</h1>
                <p className='text-sm mt-2'>Do not have an account? <Link className='text-gray-300 italic' href="/signup">Sign up!</Link></p>
                <form onSubmit={handleSubmit} className='mt-5 gap-7 flex flex-col '>
                    <input className='flex w-[300px] text-[10px] text-black outline-none bg-gray-200 rounded-sm p-2' type='text' name="username" value={data.username} onChange={handleInput} placeholder='Enter your username'/>
                    <input className='flex w-[300px] text-[10px] text-black outline-none bg-gray-200 rounded-sm p-2' type='text' name='email' value={data.email} onChange={handleInput} placeholder='Enter your email'/>
                    <input className='flex w-[300px] text-[10px] text-black outline-none bg-gray-200 rounded-sm p-2' type='text' name='user_type' value={data.user_type} onChange={handleInput} placeholder='Signing in as?'/>
                    <input className='flex w-[300px] text-[10px] text-black outline-none bg-gray-200 rounded-sm p-2' type='password' name='password' value={data.password} onChange={handleInput} placeholder='Enter your password'/>
                    <button className='flex w-[300px] text-sm  bg-[#431f97] items-center justify-center rounded-md p-2'>Sign in</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login