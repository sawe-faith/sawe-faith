import React from 'react'
import { Link } from 'react-router-dom'


const LandingPage = () => {
  return (
    <div className=' grid grid-cols-2 w-full'>
      <div className=' flex  flex-col items-center  w-full'>
        <div className=' flex items-center mt-[110px] justify-center gap-2'>
          <img className='w-[50px] h-[50px]'  src='/src/assets/logo.png' alt='logo'/> 
          <h1 className='italic'>Easy<span className='delius-regular text-[20px] '>Link</span></h1>
        </div>
      <div className=' flex flex-col items-center justify-center  mt-11  w-full'>
        <h1 className='flex w-full items-center justify-center text-center text-sm italic'> ~ Welcome to EasyLink — Where Opportunities Await! ~ </h1>
        <h1 className='flex w-full items-center text-[20px] mt-7 justify-center delius-regular text-center'>Your future starts here. Dive into our <br />extensive  job listings and take charge of your career path</h1>
        <h1 className='flex w-full items-center text-[23px] mt-7 justify-center delius-regular text-center'>With our tools and resources, you’ll be well on your way to landing your dream job. Let’s get started!</h1>
        </div>
        <div>
         <Link to='/login'><button className='flex items-venter shadow-md justify-center text-sm p-2 w-[250px] rounded-md mt-6 bg-orange-500 hover:bg-blue-300 hover:font-bold text-white hover:text-black'>Sign up to Get Started </button></Link>
        </div>
        <div className=' flex items-center justify-center mt-7'>
          <p>Don't have an account? <Link to='/signup'><span className='text-blue-900 text-lg font-bold'>Sign up</span></Link> </p>
        </div>
      </div>
      <div className='flex w-full '>
    <img src='/src/assets/landingPage.png' alt='logo'/>
      </div>
    </div>
  )
}

export default LandingPage