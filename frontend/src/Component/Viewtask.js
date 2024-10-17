import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CreateContext } from "../App";
import axios from 'axios';
const ViewTask = () => {
  const { auth, setAuth, userId, setUserId } = useContext(CreateContext);
  const [viewtask,setViewTask]=useState("");
  useEffect(()=>{
         const taskview=async(id)=>{
              try{
                 const response=await axios.get(`http://localhost:5000/singletask/${id}`)
                 console.log(response.data);
                 console.log("response.data is one task>>>",response.data);
              } 
              catch(err){
                console.log(err)
              }
         }
         taskview();
         if (userId) {
          taskview(userId); 
        }
  },[userId])
 
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white p-10 shadow-lg rounded-xl mx-4">
        <h1 className="font-bold text-4xl text-center text-gray-900 mb-8">Task Details</h1>
        <form className="space-y-8">
          <h1 className='font-bold text-3xl'>{auth}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
         
            <div>
              <label className="block text-sm font-medium text-gray-600">Task Title</label>
              <input 
                type="text" 
                className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                placeholder='software...'
                value={viewtask.task || " "}
                readOnly
              />
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-600">Task ID</label>
              <input 
                type="text" 
                className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                placeholder='taskid...'
                value={viewtask._id || " "}
                readOnly
              />
            </div>
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <textarea 
              className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              rows="5"
              value={viewtask.description || ''}
              readOnly
            >
              
            </textarea>
          </div>

          
          <div className="flex justify-between mt-8">
            <Link to="/updatetask" className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-300">
              Edit Task
            </Link>
            <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-300">
              Delete Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewTask;
