import Button from "./Button"
import useAuthenticatedQuery from "../../hooks/useAuthenticatedQuery";
import Modal from "./Modal";
import Input from "./input";
import React, { useState } from "react";
import { Textarea } from "./Textarea";
import type { ITodo } from "../../Interface";
import axiosInstance from "../../config/axios.config";

const TodoList = () =>{
    const [isEditModalOpen , setIsEditModalOpen] = useState(false)
    const [todoToEdit , setTodoToEdit] = useState<ITodo>({
        documentId : "",
        id : 0,
        title : "",
        description : ""
    })
    const[isUpdateing , setIsUpdating] = useState(false)


        const userDataString = localStorage.getItem("loggedInUser");
        const userData = userDataString ? JSON.parse(userDataString) : null;
      
   const {isLoading , data , error} = useAuthenticatedQuery({url : "/users/me?populate=todos" , 
   
   config : {headers : {Authorization : `Bearer ${userData.jwt}`}} ,
   
   queryKey : ["todos"  , todoToEdit.documentId]
   
   })
   


// handle Edit Modal
   const onCloseEditModal = () => {
    setTodoToEdit({
        documentId : "",
        id : 0,
        title : "",
        description : ""
    })
    setIsEditModalOpen(false) }

    const onOpenEditModal = (todo :ITodo) => {
        setTodoToEdit(todo)
        setIsEditModalOpen(true)
        
    }
   const onChangeHandler = (e :React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
       const {name , value} = e.target
       setTodoToEdit({...todoToEdit , [name] : value})
   }
   const onSubmitHandler = async (e :React.FormEvent<HTMLFormElement>) => {
       e.preventDefault()
       setIsUpdating(true)
       const {title , description} = todoToEdit
       try {
 const{ status }=       await axiosInstance.put(`/todos/${todoToEdit.documentId}` , {data : 
            {
                title : title,
                description : description
            }
        } , {
            headers : {
                Authorization : `Bearer ${userData.jwt}`
            }
        })

        if(status === 200){
            onCloseEditModal()
        }
       }catch (error) {
           console.log(error);
           
       } finally{
        setIsUpdating(false)
       }
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


        data.todos.map((todo :ITodo) => (
            <div key={todo.id} className=" flex justify-between items-center  hover:bg-slate-200  duration-300 rounded-md p-2">
            <p  className=" w-full font-semibold">{todo.title}</p>
            <div className=" flex gap-2 items-center justify-end  space-x-3">
                <Button  size={"sm"} onClick= {() => onOpenEditModal(todo)}>Edit</Button>
                <Button variant={"danger"} size={"sm"}>Remove</Button>
            </div>

        </div>
        ))) : (

            <p className=" text-center text-5xl text-gray-500">No todos found</p>
        )

        }   
        <Modal  isOpen={isEditModalOpen} closeModal={onCloseEditModal} title="Edit Todo">
       <form onSubmit={onSubmitHandler} className=" space-y-3">
       <Input  name="title" value={todoToEdit.title} onChange={onChangeHandler}/>
        <Textarea name="description" value={todoToEdit.description} onChange={onChangeHandler} />
       <div className=" flex gap-2 items-center   space-x-3 mt-3">
       <Button className="bg-indigo-600   hover:bg-indigo-700" isLoading={isUpdateing}>Update</Button>
        <Button   onClick={onCloseEditModal} variant={"cancel"}>Cancel</Button>
       </div>
       </form>
        </Modal>
            

    </div>
    
    </>
}
export default TodoList 