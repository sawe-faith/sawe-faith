"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Router } from 'next/dist/client/router'
import { useRouter } from 'next/navigation'
import { SiWorkplace } from "react-icons/si";


const SignUp = () => {
    const router=useRouter()
   const [data, setData]=useState({
           
          username:"",
          email:"",
          password:"",
          location:"",
          about:"",
          user_role:"",
          user_type:""
      }
      )
      const handleInput=(e)=>{
          const {name, value}=e.target
          setData({...data, [name]:value})
      }

      const handleSubmit =(e)=>{
        e.preventDefault()
        fetch("http://127.0.0.1:5555/users",{
            method:"POST",
            headers:{"Content-type":"application/json",},
            body:JSON.stringify(data)
        })
        .then((response)=>{
            if(!response.ok){
                throw new Error("Failed to submit your user details")
            }
            return response.json()
        })
        .then((data)=>{
            console.log("Signup data............", data)
            alert("Account created Successfully!")
            sessionStorage.setItem("id", data.id)
            sessionStorage.setItem("token", data.token)

            const user=data.user_type

            console.log("user...............................", user)

           
       
           
        })
        .catch(error=>{console.error("Error while trying to create user", error)})

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
                <img className='flex w-[500px] h-auto' src='/signup.png' alt="image for the login page"/>
            </div>
            <div className='flex flex-col h-full w-[400px] ml-[150px] shadow-lg bg-gradient-to-l from-[#040313] to-[#0c093d] rounded-lg items-center'>
                <h1 className='mt-[20px] text-center text-[20px]'>Sign up to create a new account</h1>
                <p className='text-sm mt-2'>Already have an account? <Link className='text-gray-300 italic' href="/login">Sign in!</Link></p>
                <form onSubmit={handleSubmit}  className='mt-5 gap-6 flex flex-col '>
                    <input className='flex w-[300px]  text-[10px] text-black outline-none bg-gray-200 rounded-sm p-2' type='text' name="username" value={data.username} onChange={handleInput} placeholder='Enter your username'/>
                    <input className='flex w-[300px]  text-[10px] text-black outline-none bg-gray-200 rounded-sm p-2' type='text' name='email' value={data.email} onChange={handleInput} placeholder='Enter your email'/>
                    <div className='flex gap-4 w-[300px]'><input className='flex w-[300px]  text-[10px] text-black outline-none bg-gray-300 rounded-sm p-2' type='text' name='user_role' value={data.user_role} onChange={handleInput} placeholder='Add a role'/>
                    <input className='flex w-[150px]  text-[10px] text-black outline-none bg-gray-300 rounded-sm p-2' type='text' name='location' value={data.location} onChange={handleInput} placeholder='Where you from?'/></div>
                    <textarea className='flex w-[300px]  text-[10px] text-black outline-none bg-gray-300 rounded-sm p-2' type='text' name='about' value={data.about} onChange={handleInput} placeholder='briefly describe yourself'/>
                    <input className='flex w-[300px]  text-[10px] text-black outline-none bg-gray-300 rounded-sm p-2' type='text' name='user_type' value={data.user_type} onChange={handleInput} placeholder='Signing up as admin or user?'/>
                    <input className='flex w-[300px]  text-[10px] text-black outline-none bg-gray-300 rounded-sm p-2' type='password' name='password' value={data.password} onChange={handleInput} placeholder='Enter your password'/>
                    <button className='flex w-[300px]  text-sm  bg-[#4821a5] items-center justify-center rounded-md p-2'>Create account</button>
                </form>
            </div>
        </div>
    </div>
  )
}



export default SignUp