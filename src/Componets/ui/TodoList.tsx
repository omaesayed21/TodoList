import { useEffect, useState } from "react"
import Button from "./Button"
import axiosInstance from "../../config/axios.config"
import { useQuery } from "@tanstack/react-query";

const TodoList = () =>{

        const userDataString = localStorage.getItem("loggedInUser");
        const userData = userDataString ? JSON.parse(userDataString) : null;
      
   const {isLoading , data} =  useQuery({

    queryKey: ["todos"],
    queryFn :async () =>{

   const {data} =  await axiosInstance.get("/users/me?populate=todos" , {
        headers : {
            Authorization : `Bearer ${userData.jwt}`
        }
    })
    return data
     
   } 
   })
console.log(data);



if(isLoading){
    return <div>Loading...</div>
}


    return <>
    <div className=" space-y-1">
    { data.todos.legnth  ?
        data.todos.map(todo => (
            <div key={todo.id} className=" flex justify-between items-center  hover:bg-slate-200  duration-300 rounded-md p-2">
            <p  className=" w-full font-semibold">{todo.title}</p>
            <div className=" flex gap-2 items-center justify-end  space-x-3">
                <Button  size={"sm"}>Edit</Button>
                <Button variant={"danger"} size={"sm"}>Remove</Button>
            </div>

        </div>
        ))
    :
        <p className=" text-center text-gray-400">No todos found</p>
        }   
        
            
            

    </div>
    
    </>
}
export default TodoList 