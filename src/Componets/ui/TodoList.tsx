import Button from "./Button"
import useAuthenticatedQuery from "../../hooks/useAuthenticatedQuery";
import Modal from "./Modal";
import Input from "./input";
import { useState } from "react";

const TodoList = () =>{
    const [isEditModalOpen , setIsEditModalOpen] = useState(false)


        const userDataString = localStorage.getItem("loggedInUser");
        const userData = userDataString ? JSON.parse(userDataString) : null;
      
   const {isLoading , data , error} = useAuthenticatedQuery({url : "/users/me?populate=todos" , 
   
   config : {headers : {Authorization : `Bearer ${userData.jwt}`}} ,
   
   queryKey : ["todos"]})
   



   const onToggleEditModal = () => {
    setIsEditModalOpen(prev => !prev)
   }
   
//    useQuery({

//     queryKey: ["todos"],
//     queryFn :async () =>{

//    const {data} =  await axiosInstance.get("/users/me?populate=todos" , {
//         headers : {
//             Authorization : `Bearer ${userData.jwt}`
//         }
//     })
//     return data
     
//    } 
//    })
// // console.log(data.todos);



if(isLoading){
    return <div>Loading...</div>
}

if(error){
    return <div>Error</div>
}

    return <>
    <div className=" space-y-1">
    { data.todos.length  ?  (


        data.todos.map(todo => (
            <div key={todo.id} className=" flex justify-between items-center  hover:bg-slate-200  duration-300 rounded-md p-2">
            <p  className=" w-full font-semibold">{todo.title}</p>
            <div className=" flex gap-2 items-center justify-end  space-x-3">
                <Button  size={"sm"} onClick={onToggleEditModal}>Edit</Button>
                <Button variant={"danger"} size={"sm"}>Remove</Button>
            </div>

        </div>
        ))) : (

            <p className=" text-center text-5xl text-gray-500">No todos found</p>
        )

        }   
        <Modal isOpen={isEditModalOpen} closeModal={onToggleEditModal} title="Edit Todo">
        <Input value=" Edit Title" placeholder="Title" />
        <Input placeholder="Description" />
       <div className=" flex gap-2 items-center justify-end  space-x-3 mt-3">
       <Button className="bg-indigo-600  hover:bg-indigo-700">Save</Button>
        <Button   onClick={onToggleEditModal} variant={"cancel"}>Cancel</Button>
       </div>
        </Modal>
            
            

    </div>
    
    </>
}
export default TodoList 