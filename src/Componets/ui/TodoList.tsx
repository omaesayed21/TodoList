import { useEffect, useState } from "react"
import Button from "./Button"
import axiosInstance from "../../config/axios.config"

const TodoList = () =>{
    const [todos , setTodos] = useState([]);

        const userDataString = localStorage.getItem("loggedInUser");
        const userData = userDataString ? JSON.parse(userDataString) : null;
      
    useEffect(() => {
        try {
         axiosInstance.get('/users/me?populate=todos', {
            headers:{
                Authorization: `Bearer ${userData.jwt}`
            }
         }
         
         ).then((res) => 
            setTodos(res.data.todos))
            .catch((error) => {
            console.log( "The Error" , error);
         })
        }
        catch (error) {
            console.log(error);
            
        }

    }, [
        userData.jwt
    ])



    return <>
    <div className=" space-y-1">

        {
            todos.map(todos =>(
                <div key={todos.id} className=" flex justify-between items-center  hover:bg-slate-200  duration-300 rounded-md p-2">
                <p  className=" w-full font-semibold">{todos.title}</p>
                <div className=" flex gap-2 items-center justify-end  space-x-3">
                    <Button  size={"sm"}>Edit</Button>
                    <Button variant={"danger"} size={"sm"}>Remove</Button>
                </div>
    
            </div>
            ))
        }

      

    </div>
    
    </>
}
export default TodoList