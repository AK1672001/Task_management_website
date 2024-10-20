import React, { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { CreateContext } from "../App";
import { useNavigate } from 'react-router-dom';
const Addtask = () => {
  const {auth,setAuth,userId,setUserId}=useContext(CreateContext)
  const [description,setDescription]=useState("")
  const [task,setTask]=useState("")
  const [success,setSuccess]=useState("");
  const [error,setError]=useState("");
  const navigate=useNavigate()
   console.log("userid post>>",userId)
  const handlechange=(e)=>{
      e.preventDefault();
      setDescription(e.target.value);
  }
  const handlechangetask=(e)=>{
    e.preventDefault();
    setTask(e.target.value);
  }
  const addtask=async()=>{
    console.log("task",description)
    
      try{
          const response=await axios.post("https://task-management-website-865l.onrender.com/addtask",{description,task,userId})
          console.log(response.data);
          setSuccess(response.data.msg)
          setTimeout(()=>{
            navigate("/tasklist")
            setSuccess("")  
          },2000)
          setDescription("")
          setTask("")
      }
      catch(err){
        setError(err.response.data.msg);
        setTimeout(()=>{
           setError("")
        },2000)
        console.log(err)
      }
  }
  return (
    <>
    <div className='p-2 justify-center flex mt-4'>
        <div className="overflow-hidden w-[50rem] p-2 shadow-2xl border border-x-black border-y-black rounded-2xl">
            <div>
                <h1 className='font-bold text-3xl text-center'>Create a task</h1>
            </div>
            {
              success && (
                <>
                <p className='text-green-600 font-bold text-sm sm:text-3xl'>{success}</p>
                </>
              )
            }
            {
              error && (
                <>
                <p className='text-red-600 font-bold text-3xl'>{error}</p>
                </>
              )
            }
            <div className='grid grid-cols-1 p-2'>
            <h1 className='font-bold text-2xl'>{auth}</h1>
                <span className='mt-5'>task</span>
                <input onChange={handlechangetask} value={task} className='border border-x-black px-3 p-3 border-y-black rounded-2xl' type="text" placeholder='software developer' />
                <span className='mt-5'>description</span>
                <textarea onChange={handlechange} value={description} className='border border-x-black px-3 border-y-black rounded-2xl ' placeholder='message here...'>
                </textarea>
                <button onClick={addtask} className='bg-blue-800 rounded-2xl p-2 mt-5 text-white'>addtask</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Addtask