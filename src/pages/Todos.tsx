import React, { useState } from "react";
import TodoSkeleton from "../Componets/ui/TodoSkeleton";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery"
import type { ITodo } from "../Interface";
import Paginator from "../Componets/ui/Paginator";
import axiosInstance from "../config/axios.config";
import { faker } from "@faker-js/faker";
import Button from "../Componets/ui/Button";

const TodosPage = () => {
    const [Page , setPage] = useState<number>(1)
    const [pageSize , setPageSize] = useState<number>(10)
    const [SortBy , setSortBy] = useState<string>("DESC")

    const onGenrateTodo = async () => {
        for(let i = 0 ; i < 100 ; i ++){
            try {
                const{ data }=          await axiosInstance.post(`/todos` , {data : 
                             {
                                 title : faker.word.words(5),
                                 description : faker.lorem.paragraph(2),
                                 user : userData.id  
                             }
                         } , {
                             headers : {
                                 Authorization : `Bearer ${userData.jwt}`
                             }
                         })
                         console.log(data);
                         
                        
                        }catch (error) {
                            console.log(error);
                            
                        }
             
        }
    
     
    }

    
    const userDataString = localStorage.getItem("loggedInUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;


    const {isLoading , data } = useAuthenticatedQuery({url : `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${Page}&sort=createdAt:${SortBy}` , 
   
    config : {headers : {Authorization : `Bearer ${userData.jwt}`}} ,
    
    queryKey : [`todos-page-${Page} -${pageSize} - ${SortBy}`]
 
})

console.log(data);

const onClickPrev = () => setPage(prev => prev - 1)
const onClickNext = () => setPage(prev => prev + 1)
 
const onChangePageSize = (e :React.ChangeEvent<HTMLSelectElement>) => setPageSize(Number(+e.target.value))
const onChangeSortBy = (e :React.ChangeEvent<HTMLSelectElement>) => setSortBy(String(e.target.value))


    if(isLoading){
        return <>
        
        <div className="space-y-1 p-3">
            {Array.from({ length: 3 }, (_, idx) => (
              <TodoSkeleton key={idx} />
            ))}{" "}
          </div>
    
        
        
        </>
          
            }
            
  return  <>
    <div className=" max-w-2xl mx-auto my-20 space-y-6">
   
   
 <div className="flex items-center justify-between">
 <Button size={"sm"} className="mx-auto"  variant={"outline"} onClick={onGenrateTodo}>Genrate Todo</Button>
            <div className="flex items-center justify-between space-x-2 " >
              <select  className= " border-2  rounded-md  border-indigo-600 p-2 name=" id="" value={SortBy} onChange={onChangeSortBy}>

                  <option value="ASC">Oldest</option>
                  <option value="DESC">Latest</option>
              </select>
              
              
                <select name="" id="" className= " border-2  rounded-md  border-indigo-600 p-2  " value={pageSize} onChange={onChangePageSize}>
                    <option disabled>Page Size</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                </select>

            </div>
 </div>
<div className="space-y-6">

{ data.data.length  ?  (


data.data.map((todo :ITodo) => (
    <div key={todo.id} className=" flex justify-between items-center  hover:bg-slate-200  duration-300 rounded-md p-2">
    <h3  className=" w-full font-semibold">{todo.title}</h3>

</div>
))) : (

    <p className="  text-center text-5xl text-gray-500">No Todos Found</p>
)

} 
</div>
<Paginator pageCount={data.meta.pagination.pageCount}  total={data.meta.pagination.total} page={Page} onClickNext={() => onClickNext()} onClickPrev={() => onClickPrev()} isLoading={isLoading} />
    </div>
 
 </> 

    
}

export default TodosPage