import Button from "./Button"
import useAuthenticatedQuery from "../../hooks/useAuthenticatedQuery";
import Modal from "./Modal";
import Input from "./input";
import React, { useState } from "react";
import { Textarea } from "./Textarea";
import type { ITodo } from "../../Interface";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";

const TodoList = () =>{
    const [isEditModalOpen , setIsEditModalOpen] = useState(false)
    const [todoToEdit , setTodoToEdit] = useState<ITodo>({
        documentId : "",
        id : 0,
        title : "",
        description : ""
    })
    const[isUpdateing , setIsUpdating] = useState(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);



        const userDataString = localStorage.getItem("loggedInUser");
        const userData = userDataString ? JSON.parse(userDataString) : null;
      
   const {isLoading , data , error} = useAuthenticatedQuery({url : "/users/me?populate=todos" , 
   
   config : {headers : {Authorization : `Bearer ${userData.jwt}`}} ,
   
   queryKey : ["todos"  , todoToEdit.documentId]


   
   })
   


// handle Edit Modal
   const onCloseModal = () => {
    setTodoToEdit({
        documentId : "",
        id : 0,
        title : "",
        description : ""
    })
    setIsEditModalOpen(false)
setIsOpenConfirmModal(false)
}

    const onOpenModal = (todo :ITodo) => {
        setTodoToEdit(todo)
        setIsEditModalOpen(true)        
    }
    const onOpenConfirmModal = (todo :ITodo) => {
        setTodoToEdit(todo)
        setIsOpenConfirmModal(true)

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
        onCloseModal()
            toast.success("Todo updated successfully !")
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
                <Button  size={"sm"} onClick= {() => onOpenModal(todo)}>Edit</Button>
                <Button variant={"danger"} size={"sm"}  onClick={() => onOpenConfirmModal(todo)}>Remove</Button>
            </div>

        </div>
        ))) : (

            <p className=" text-center text-5xl text-gray-500">No todos found</p>
        )

        }  


        {/* Edit Modal  */}

        <Modal  isOpen={isEditModalOpen} closeModal={onCloseModal} title="Edit Todo">
       <form onSubmit={onSubmitHandler} className=" space-y-3">
       <Input  name="title" value={todoToEdit.title} onChange={onChangeHandler}/>
        <Textarea name="description" value={todoToEdit.description} onChange={onChangeHandler} />
       <div className=" flex gap-2 items-center   space-x-3 mt-3">
       <Button className="bg-indigo-600   hover:bg-indigo-700" isLoading={isUpdateing}>Update</Button>
        <Button   onClick={onCloseModal} variant={"cancel"}>Cancel</Button>
       </div>
       </form>
      
      {/* Delete Modal */}

        </Modal>
            <Modal isOpen={isOpenConfirmModal}  closeModal={onCloseModal}  title={"Are you sure you want to remove this todo from your store ?"}          description="Deleting this todo will remove it permenantly from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action.">
            <div className="flex items-center space-x-3 mt-4">
          <Button variant="danger">
            Yes , Remove
          </Button>
          <Button variant="cancel" type="button" onClick={onCloseModal} >
            Cancel
          </Button>
        </div>      
        
                </Modal> 

    </div>
    
    </>
}
export default TodoList 