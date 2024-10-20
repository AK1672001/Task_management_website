import React, { useEffect, useState } from "react";
import { Link ,useNavigate,useParams} from "react-router-dom";
import { useContext } from 'react';
import { CreateContext } from "../App";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
const TaskList = () => {
  const { auth, setAuth, userId, setUserId } = useContext(CreateContext);
  const [gettask, setGetTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
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
  }, []);

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
            console.log("id delete>>",id)
            const deleteuser=await gettask.filter(item => item._id !==id);

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
      <div className="sm:p-4 p-4 mt-6 overflow-x-auto ">
        {gettask.length > 0 ? (
          <table className="min-w-full  table-auto border-collapse border border-gray-300">
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
                   
                  <td className="border border-gray-300 px-4 py-2">{item.user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.task}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className=" grid sm:grid-cols-3 grid-cols-1 items-center gap-2 sm:gap-0">
                      <Link to={`/viewtask/${item._id}`} className="text-blue-600 hover:underline font-bold text-2xl"><GrFormView /></Link>
                     {
                       auth && (
                        <>
                         <Link to={`/updatetask/${item._id}`} className="text-yellow-500 hover:underline font-bold text-xl"><MdEdit /></Link>
                      <button onClick={()=>handledelete(item._id)} className="text-red-600 hover:underline font-bold text-xl">
                      <MdDelete />
                      </button>
                        </>
                       )
                     }
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-6">No task is available <span className="text-blue-600 underline"><Link to={"/addtask"}>create task here</Link></span></div>
        )}
      </div>
    </>
  );
};

export default TaskList;
