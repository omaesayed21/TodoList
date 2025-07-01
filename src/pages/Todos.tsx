import { useState } from "react";
import TodoSkeleton from "../Componets/ui/TodoSkeleton";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery"
import type { ITodo } from "../Interface";
import Paginator from "../Componets/ui/Paginator";

const TodosPage = () => {
    const [Page , setPage] = useState<number>(1)

    
    const userDataString = localStorage.getItem("loggedInUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;


    const {isLoading , data } = useAuthenticatedQuery({url : `/todos?pagination[pageSize]=10&pagination[page]=${Page}` , 
   
    config : {headers : {Authorization : `Bearer ${userData.jwt}`}} ,
    
    queryKey : [`todos-page-${Page}`]
 
})

console.log(data);

const onClickPrev = () => setPage(prev => prev - 1)
const onClickNext = () => setPage(prev => prev + 1)
 
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