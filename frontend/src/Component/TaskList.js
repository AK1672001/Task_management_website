import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CreateContext } from "../App";
import axios from "axios";

const TaskList = () => {
  const { auth, setAuth, userId, setUserId } = useContext(CreateContext);
  const [gettask, setGetTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success,setSuccess]=useState("")

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get("http://localhost:5000/gettask");
        console.log(response.data);
        setGetTask(response.data.user);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, [gettask]);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }
  const handledelete=async(id)=>{
        try{
            const response=await axios.delete(`http://localhost:5000/deletetask/${id}`)
            console.log(response.data)
            setSuccess(response.data.msg)
            setTimeout(()=>{
              setSuccess(" ")
            },2000)
            const deleteuser=await gettask.filter((_,item)=>item._id!==id)
            console.log("deleteuser",deleteuser)
            setGetTask(deleteuser)
             
        }
        catch(err){
          console.log(err)
        }
  }
  
  return (
    <>
      <div>
        <h1 className="font-bold text-3xl text-center mt-6">Task List</h1>
      </div>
      {
        success && (
          <>
          <p className="text-green-600 font-bold text-3xl">{success}</p>
          </>
        )
      }
      <div className="p-4 mt-6 overflow-x-auto">
        {gettask.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Task</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {gettask.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{auth}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.task}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center space-x-3">
                      <Link to="/viewtask" className="text-blue-600 hover:underline">View</Link>
                      <Link to="/updatetask" className="text-yellow-500 hover:underline">Edit</Link>
                      <button onClick={()=>handledelete(item._id)} className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-6">No tasks available</div>
        )}
      </div>
    </>
  );
};

export default TaskList;
