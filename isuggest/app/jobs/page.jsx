"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { SiWorkplace } from "react-icons/si";
import Link from 'next/link';
import { CiStar } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { TbBadgeFilled } from "react-icons/tb";
import { FaFilePdf } from "react-icons/fa";
import UserModal from '../components/UserModal';

const page = () => {
  const id = sessionStorage.getItem("id");
  const [job, setJob] = useState([]);
  const [user, setUser] = useState(null);
  const [isAvaillable, setIsAvaillable] = useState(false);
  const [data, setData]=useState({
           
          company:"",
          job_title:"",
          job_description:"",
          salary:""
      }
      )
      const handleInput=(e)=>{
        const {name, value}=e.target
        setData({...data, [name]:value})
    }

  const toggleJobs = () => {
    setIsAvaillable(!isAvaillable);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5555/jobs")
      .then((response) => {
        if (!response) {
          throw new Error("Error while fetching jobs");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Your jobs served...........", data);
        setJob(data);
        
      })
      .catch((error) => {
        console.error("Error while fetching jobs", error);
      });
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/user/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to get user");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User details.............", data);
        setUser(data);
      })
      .catch((error) => {
        console.error("Error trying to get user details with the specified id", error);
      });
  }, []);

  const handleDelete = (jobId) => {
    fetch(`http://127.0.0.1:5555/jobs/${jobId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the job");
        }
        setJob(job.filter((kazi) => kazi.id !== jobId));
      })
      .catch((error) => {
        console.error("Error while deleting job", error);
      });
  };

  //logic to submit a new job
  const handleSubmit=(e)=>{
    // e.preventDefault()
    fetch("http://127.0.0.1:5555/jobs",{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(data)
    })
    .then((response)=>{
      if(!response.ok){
        throw new Error("error while creating job")
      }
      return response.json()
    })
    .then((data)=>{
      console.log("new job data.............", data)
      setData(data)
      alert("Job successfully created!")
    })
    .catch(error=>{console.error("Failed to create job", error)})
  }

  return (
    <div className='flex w-full  items-center flex-col  bg-gradient-to-r from-[#040313] to-[#0c093d]  text-white'>
      <div className='flex w-full mt-4 items-center justify-between '>
        <Link href="/">
          <div className='flex items-center ml-[60px]'>
            <SiWorkplace className='text-orange-500' />
            <p className='italic'>vacan</p>
            <span className='text-lg '>C</span>
          </div>
        </Link>
        <div className='ml-[160px]'>
          <Navbar />
        </div>
        <input type='text' placeholder='Search job......' className='text-[12px] p-1.5 outline-none text-black w-[250px] rounded-sm' />
        <div className='mr-[30px]'>
         <Link href="/user"> <img className={`w-[40px] hover:${<UserModal />}}   border rounded-full border-[#4fb877] h-auto `}  src='/usericon.png' alt='user profile' /></Link>
        </div>
      </div>
      <div className='grid w-full p-4 h-full grid-cols-9  gap-5 items-center justify-center'>
        <div className='flex gap-5  items-center w-full col-span-2 h-full   flex-col '>
          <div className='flex   items-center w-full col-span-2 h-[200px]  justify-center flex-col    shadow-lg bg-gradient-to-l from-[#040313] to-[#0c093d] rounded-lg ' >
            <div className='flex w-full items-center justify-center'>
              <img className='w-[80px] border rounded-full border-[#4fb877] h-auto' src='/usericon.png' alt='user profile' />
            </div>
            {user && (
              <div className='flex p-2 w-full items-center justify-center text-center flex-col'>
                <h1 className='font-bold text-lg'>{user.username}</h1>
                <p className='text-[9px] italic  '>{user.about}</p>
                <p className='text-[12px] mt-3 italic'>{user.location}</p>
              </div>
            )}
          </div>
          <div className='flex gap-9   items-center w-full col-span-2 h-[300px]  justify-center flex-col    shadow-lg bg-gradient-to-l from-[#040313] to-[#0c093d] rounded-lg ' >
            <h1 className='flex w-full items-center justify-start px-4 rounded-sm  text-[15px] hover:cursor-pointer hover:bg-gray-50 hover:text-black p-1 '>
              <CiStar size={20} className='mr-3' />Find jobs with AI
            </h1>
            <h1 className='flex w-full items-center justify-start px-4 rounded-sm  text-[15px] hover:cursor-pointer hover:bg-gray-50 hover:text-black p-1 '>
              <FaBars size={20} className='mr-3' />Preferences
            </h1>
            <h1 className='flex w-full items-center justify-start px-4 rounded-sm  text-[15px] hover:cursor-pointer hover:bg-gray-50 hover:text-black p-1 '>
              <TbBadgeFilled size={20} className='mr-3' />My jobs
            </h1>
            <Link className='flex w-full' target='blank' href="https://www.uopeople.edu/blog/top-12-interview-tips-for-success/">
              <h1 className='flex w-full items-center justify-start px-4 rounded-sm  text-[15px] hover:cursor-pointer hover:bg-gray-50 hover:text-black p-1 '>
                <FaFilePdf size={20} className='mr-3' />Interview prep docs
              </h1>
            </Link>
          </div>
        </div>

        <div style={{ maxHeight: '600px', scrollbarWidth: 'none' }} className='flex overflow-y-auto items-center col-span-4 w-full flex-col h-full shadow-lg bg-gradient-to-l from-[#040313] to-[#0c093d] rounded-lg '>
          <div className='flex w-full items-center justify-start flex-col mt-12'>
            <h1 className='text-xl w-full justify-start ml-[60px] font-bold'>Jobs made availlable to the users</h1>
            <p className='flex text-[10px] w-full ml-[60px] mt-3'>
              You have the ability to update or remove a job posting from the list
            </p>
          </div>

          {job.length > 0 ? (
            job.map((kazi) => (
              <div key={kazi.id} className='flex mt-[20px] w-full items-center justify-start flex-col'>
                <div className='grid w-full items-center gap-4 grid-cols-5'>
                  <div className='ml-[30px] col-span-1'>
                    <img className='w-[40px] h-auto' src='/rocket1.png' alt="Rocket image" />
                  </div>
                  <div className='flex w-full col-span-3 flex-col'>
                    <h1 className='hover:underline text-sm'>{kazi.job_title} <span className='text-[10px] text-gray-200'>( company )</span></h1>
                    <h2 className='text-[12px]'>{kazi.company}</h2>
                    <p className='text-[10px] italic'>{kazi.job_description}</p>
                    <button className='flex w-[200px] text-[12px] p-1.5 items-center hover:bg-orange-400 justify-center bg-[#4821a5] rounded-sm mt-3'>Learn more ......</button>
                  </div>
                  <div onClick={() => handleDelete(kazi.id)} className='text-lg ml-[40px] hover:cursor-pointer'>x</div>
                </div>
                <div className='flex w-full'>
                  <hr className='w-full ml-[10px] mr-[10px] mt-4 mb-2' />
                </div>
              </div>
            ))
          ) : (
            <div className='flex w-full items-center justify-center mt-[20px] flex-col'>
              <img src='/tomandjerry.png ' alt='not availlable photo' className='w-[400px] h-auto'/>
              <h1 className='italic text-sm mt-6'>No jobs availlable yet!</h1>
            </div>
          )}
        </div>

        <div className='flex gap-5 items-center w-full col-span-3 h-full flex-col'>
          <div className='flex items-center w-full col-span-2 h-[300px] justify-center flex-col shadow-lg bg-gradient-to-l from-[#040313] to-[#0c093d] rounded-lg'>
            <h1 className='mt-3 mb-4'>Create a new Job</h1>
            <form onSubmit={handleSubmit} className='flex gap-4 flex-col'>
              <input type='text' name='company' onChange={handleInput} value={data.company} placeholder='Add your company name' className='flex w-[300px] text-[10px] p-2 rounded-sm outline-none text-black'/>
              <input type='text' name='job_title' onChange={handleInput} value={data.job_title} placeholder='What is your job title?' className='flex w-[300px] text-[10px] p-2 rounded-sm outline-none text-black'/>
              <textarea type='text' name='job_description' onChange={handleInput} value={data.job_description} placeholder='Describe the job offer' className='flex w-[300px] text-[10px] p-2 rounded-sm outline-none text-black'/>
              <input type='text' name='salary' onChange={handleInput} value={data.salary} placeholder='Define a salary range' className='flex w-[300px] text-[10px] p-2 rounded-sm outline-none text-black'/>
              <button className='flex w-[300px] hover:bg-orange-400 mb-5 p-2 rounded-sm items-center text-[11px] bg-[#431f97] justify-center'> Create Job Now</button>

            </form>
          </div>
          <div className='flex items-center w-full col-span-2 h-[180px] justify-center flex-col shadow-lg bg-gradient-to-l from-[#040313] to-[#0c093d] rounded-lg'>
            <h1>Applied Jobs</h1>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default page;
