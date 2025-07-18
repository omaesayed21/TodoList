import Button from "./Button"
import useAuthenticatedQuery from "../../hooks/useAuthenticatedQuery";
import Modal from "./Modal";
import Input from "./input";
import React, { useState } from "react";
import { Textarea } from "./Textarea";
import type { ITodo } from "../../Interface";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { SquarePen , Trash2 , Plus   } from 'lucide-react';
import TodoSkeleton from "./TodoSkeleton";

const TodoList = () =>{
    const [isEditModalOpen , setIsEditModalOpen] = useState(false)
    const [todoToEdit , setTodoToEdit] = useState<ITodo>({
        documentId : "",
        id : 0,
        title : "",
        description : ""
    })
    const [todoToAdd , setTodoToAdd] = useState({
        title : "",
        description : ""
    })
    const[isUpdateing , setIsUpdating] = useState(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const [isAddModalOpen , setIsAddModalOpen] = useState(false)
    const [queryVerison , setQueryVerison] = useState(1)
    const [serachQuery , setSearchQuery] = useState("")


        const userDataString = localStorage.getItem("loggedInUser");
        const userData = userDataString ? JSON.parse(userDataString) : null;
      
   const {isLoading , data , error} = useAuthenticatedQuery({url : "/users/me?populate=todos" , 
   
   config : {headers : {Authorization : `Bearer ${userData.jwt}`}} ,
   
   queryKey : ["todos"  , `${queryVerison}`]


   
   })
   


// handle edit  Modal
   const onClosEditeModal = () => {
    setTodoToEdit({
        documentId : "",
        id : 0,
        title : "",
        description : ""
    })
    setIsEditModalOpen(false)
}
    const onOpenModal = (todo :ITodo) => {
        setTodoToEdit(todo)
        setIsEditModalOpen(true)        
    }

// handle add Modal
    const onCloseAddModal = () => {
        setTodoToAdd({
            title : "",
            description : ""
        })
        setIsAddModalOpen(false)
    }
    const onOpenAddModal = () => {
        setIsAddModalOpen(true)        
    }



// handle confirm Modal 
    const onCloseConfirmModal = () => {
        setTodoToEdit({
            documentId : "",
            id : 0,
            title : "",
            description : ""
        })
        setIsOpenConfirmModal(false)
    }
    const onOpenConfirmModal = (todo :ITodo) => {
        setTodoToEdit(todo)
        setIsOpenConfirmModal(true)
    }

 



   const onChangeEditHandler = (e :React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
       const {name , value} = e.target
       setTodoToEdit({...todoToEdit , [name] : value})
   }
   const onChangeAddHandler = (e :React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
       const {name , value} = e.target
       setTodoToAdd({...todoToAdd , [name] : value})
   }
   const onSubmitEditHandler = async (e :React.FormEvent<HTMLFormElement>) => {
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
            onClosEditeModal()
            toast.success("Todo updated successfully !")
            setQueryVerison(prev => prev + 1)        

        }
       }catch (error) {
           console.log(error);
           
       } finally{
        setIsUpdating(false)
       }
   }


   const onSubmitAddHandler = async (e :React.FormEvent<HTMLFormElement>) => {
       e.preventDefault()
       setIsUpdating(true)
       const {title , description } = todoToAdd
       try {
       const{ status }=       await axiosInstance.post(`/todos` , {data : 
            {
                title : title,
                description : description,
                user : userData.id  
            }
        } , {
            headers : {
                Authorization : `Bearer ${userData.jwt}`
            }
        })

        if(status === 201){
        onCloseAddModal()
            toast.success("Todo added successfully !")
            setQueryVerison(prev => prev + 1)        

        }
       }catch (error) {
           console.log(error);
           
       } finally{
        setIsUpdating(false)
       }
   }
const onRemove = async () =>{
    try{
    const {status} = await axiosInstance.delete(`/todos/${todoToEdit.documentId}` , 
    {
        headers : {
            Authorization : `Bearer ${userData.jwt}`
        }
    })
    if(status === 204){
        onCloseConfirmModal();
        toast.success("Todo deleted successfully !")
        setQueryVerison(prev => prev + 1)        

    }
    }catch (error) {
        console.log(error);
        
    }

}



if(isLoading){
    return <>
    
    <div className="space-y-1 p-3">
        {Array.from({ length: 3 }, (_, idx) => (
          <TodoSkeleton key={idx} />
        ))}{" "}
      </div>

    
    
    </>
      
        }

if(error){
    return <div>Error</div>
}

// console.log("todos", data.todos);

const uniqueTodos: ITodo[] = Array.from(
    new Map<string, ITodo>(
      data.todos.map((todo) => [todo.documentId, todo])
    ).values()
  );
  
  const filteredTodos = uniqueTodos.filter(todo =>
    todo.title.toLowerCase().includes(serachQuery.toLowerCase())
  );
  
    return <>
    <div className=" space-y-1">
    <div className=" w-fit mx-auto my-10">
 { (isLoading) ?          <div className="flex items-center space-x-2">
          <div className="  h-9 bg-gray-300 rounded-md dark:bg-gray-700 w-12"></div>
          <div className="  h-9 bg-gray-300 rounded-md dark:bg-gray-700 w-12"></div>
        </div>            : <div className=" flex items-center space-x-2">
        <div className="w-full max-w-2xl mx-auto my-10 flex items-center px-2">


  <Plus
    className="w-10 h-10 mr-36  text-white bg-indigo-700 rounded-md p-2 cursor-pointer shadow-md transition duration-200"
    onClick={onOpenAddModal}
  />
    <Input
    type="text"
    placeholder="Search Todos..."
    className="w-[400px] px-3 py-3 text-lg border border-indigo-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700"
    value={serachQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>


  
        </div>

 }        
      

    </div>

    { filteredTodos.length  ?  (


filteredTodos.map((todo :ITodo) => (
            <div key={todo.id} className=" flex justify-between items-center  hover:bg-slate-200  duration-300 rounded-md p-2">
                <div className="flex items-center">
                <span>{todo.id}- </span>
            <p  className=" w-full font-semibold">{todo.title}</p>
                </div>
            <div className=" flex gap-2 items-center justify-end  space-x-3">
             
                                    <SquarePen onClick= {() => onOpenModal(todo)} className=" w-6 h-6 text-indigo-600 cursor-pointer"></SquarePen>
                <Trash2 onClick={() => onOpenConfirmModal(todo)} className=" w-6 h-6 text-red-600 cursor-pointer"></Trash2>
            </div>

        </div>
        ))) : (

            <p className=" text-center text-5xl text-gray-500">No Todos Found</p>
        )

        }  


        {/* Edit Modal  */}

        <Modal  isOpen={isEditModalOpen} closeModal={onClosEditeModal} title="Edit Todo">
       <form onSubmit={onSubmitEditHandler} className=" space-y-3">
       <Input  name="title" value={todoToEdit.title} onChange={onChangeEditHandler}/>
        <Textarea name="description" value={todoToEdit.description} onChange={onChangeEditHandler} />
       <div className=" flex gap-2 items-center   space-x-3 mt-3">
       <Button className="bg-indigo-600   hover:bg-indigo-700" isLoading={isUpdateing}>Update</Button>
        <Button type="button"   onClick={onClosEditeModal} variant={"cancel"}>Cancel</Button>
       </div>
       </form>
      

        </Modal>
       
       {/* ADD Modal */}
       
       <Modal  isOpen={isAddModalOpen} closeModal={onCloseAddModal} title="Add Todo">
       <form onSubmit={onSubmitAddHandler} className=" space-y-3">
       <Input  name="title" value={todoToAdd.title} onChange={onChangeAddHandler}/>
        <Textarea name="description" value={todoToAdd.description} onChange={onChangeAddHandler} />
       <div className=" flex gap-2 items-center   space-x-3 mt-3">
       <Button className="bg-indigo-600   hover:bg-indigo-700" isLoading={isUpdateing}>Done</Button>
        <Button  type="button"  onClick={onCloseAddModal} variant={"cancel"}>Cancel</Button>
       </div>
       </form>
      
      {/* Delete Modal */}

        </Modal>
        {/* delete Modal */}
            <Modal isOpen={isOpenConfirmModal}  closeModal={onCloseConfirmModal}  title={"Are you sure you want to remove this todo from your store ?"}          description="Deleting this todo will remove it permenantly from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action.">
            <div className="flex items-center space-x-3 mt-4">
          <Button variant="danger" onClick={onRemove}>
            Yes , Remove
          </Button>
          <Button variant="cancel" type="button" onClick={onCloseConfirmModal} >
            Cancel
          </Button>
        </div>      
        
                </Modal> 

    </div>
    
    </>
}
export default TodoList 