import SignupLogin from "./Pages/SignupLogin";
import Navbar from "./Component/Navbar";
import { Route,Routes } from "react-router-dom";
import Addtask from "./Component/Addtask";
import TaskList from "./Component/TaskList";
import Viewtask from "./Component/Viewtask";
import Updatetask from "./Component/Updatetask";
import axios from "axios";
import { createContext} from "react";
import { useState,useEffect } from "react";
const CreateContext= createContext();
axios.defaults.baseURL="http://localhost:5000"
axios.defaults.withCredentials=true
function App() {
  const [auth, setAuth] = useState("");
  const [userId,setUserId]=useState("");
  useEffect(() => {
    const varification = async () => {
      try {
        const response = await axios.get("http://localhost:5000/verification");
        console.log(response.data);
        console.log("response verifivation", response.data);
        console.log("response verifivation", response.data.name);
        console.log("Auth",auth)
        setAuth(response.data.name);
        console.log("userid",response.data.userId);
        setUserId(response.data.userId)
      } catch (err) {
        console.log(err);
      }
    };
    varification();
  }, []);
  return (
    <div className="App">
       
       <CreateContext.Provider value={{auth,setAuth,userId,setUserId}}>
       <Navbar/>
       <Routes>
       <Route path="/" element={<SignupLogin/>}/>
         <Route path="/login" element={<SignupLogin/>}/>
         <Route path="/addtask" element={<Addtask/>}/>
         <Route path="/tasklist" element={<TaskList/>}/>
         <Route path="/viewtask" element={<Viewtask/>}/>
         <Route path="/updatetask" element={<Updatetask/>}/>
       </Routes>
       </CreateContext.Provider>
      
    </div>
  );
}

export default App;
export {CreateContext}
